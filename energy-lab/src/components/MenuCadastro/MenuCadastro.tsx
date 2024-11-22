"use client";

import { useState } from 'react';
import { cadastrarUsuario } from '../../api/route';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface CadastroUsuario {
    nomeCompleto: string;
    dataNascimento: string;
    email: string;
    numeroTelefone: string;
    senha: string;
    confirmarSenha: string;
    genero: string;
}

interface Erros {
    nome?: string;
    dataNascimento?: string;
    email?: string;
    telefone?: string;
    senha?: string;
    confirmarSenha?: string;
    genero?: string;
    global?: string;
}

interface ApiResponse<T = unknown> {
    data?: T;
    message?: string;
    error?: string;
    statusCode: number;
}

// Componente principal
export default function MenuCadastro() {
    // Estados do formulário
    const [nome, setNome] = useState<string>('');
    const [dataNascimento, setDataNascimento] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [telefone, setTelefone] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [confirmarSenha, setConfirmarSenha] = useState<string>('');
    const [genero, setGenero] = useState<string>('');
    const [erros, setErros] = useState<Erros>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    // Valida a data de nascimento
    const validarData = (data: string): boolean => {
        // Expressão regular para verificar o formato da data
        if (!data || !/^\d{2}\/\d{2}\/\d{4}$/.test(data)) {
            return false;
        }

        const [dia, mes, ano] = data.split('/').map(Number);

        if (isNaN(dia) || isNaN(mes) || isNaN(ano)) {
            return false;
        }

        // Criação do objeto de data
        const dataObj = new Date(ano, mes - 1, dia);
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        const idadeMinima = new Date();
        idadeMinima.setFullYear(hoje.getFullYear() - 120);
        idadeMinima.setHours(0, 0, 0, 0);

        return (
            dataObj.getFullYear() === ano &&
            dataObj.getMonth() === mes - 1 &&
            dataObj.getDate() === dia &&
            dataObj >= idadeMinima &&
            dataObj <= hoje &&
            ano >= 1900
        );
    };

    // Formata a data para a API
    const formatarDataParaAPI = (data: string): string => {
        // Verifica se a data está no formato correto antes de formatar
        if (!data || !/^\d{2}\/\d{2}\/\d{4}$/.test(data)) {
            throw new Error('Data inválida');
        }
        return data.replace(/\//g, '-');
    };

    // Valida os campos do formulário
    const validarFormulario = (): boolean => {
        const novosErros: Erros = {};

        // Validação do nome
        if (!nome.trim()) {
            novosErros.nome = 'Por favor, preencha o nome completo.';
        }

        // Validação da data de nascimento
        if (!dataNascimento.trim()) {
            novosErros.dataNascimento = 'Por favor, preencha a data de nascimento.';
        } else if (!validarData(dataNascimento)) {
            novosErros.dataNascimento = 'Por favor, insira uma data de nascimento válida no formato dd/mm/aaaa.';
        }

        // Validação do email
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            novosErros.email = 'Por favor, preencha um email válido.';
        }

        // Validação do telefone
        if (!telefone.trim() || !/^\(\d{2}\) \d{5}-\d{4}$/.test(telefone)) {
            novosErros.telefone = 'Por favor, preencha o número de telefone no formato correto ((00) 00000-0000).';
        }

        // Validação da senha
        if (!senha.trim()) {
            novosErros.senha = 'Por favor, preencha a senha.';
        } else if (senha.length < 6) {
            novosErros.senha = 'A senha deve ter no mínimo 6 dígitos.';
        }

        // Validação da confirmação de senha
        if (!confirmarSenha.trim()) {
            novosErros.confirmarSenha = 'Por favor, confirme a senha.';
        } else if (senha !== confirmarSenha) {
            novosErros.confirmarSenha = 'As senhas não coincidem. Por favor, verifique.';
        }

        // Validação do gênero
        if (!genero) {
            novosErros.genero = 'Por favor, selecione o gênero.';
        }

        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
    };

    // Lida com a mudança de valor no campo data de nascimento
    const handleDataNascimentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');

        // Limita o tamanho da string a 8 caracteres (ddmmaaaa)
        if (value.length > 8) {
            value = value.slice(0, 8);
        }

        // Formata a data conforme o usuário digita
        if (value.length >= 2) {
            value = value.slice(0, 2) + (value.length > 2 ? '/' + value.slice(2) : '');
        }
        if (value.length >= 5) {
            value = value.slice(0, 5) + (value.length > 5 ? '/' + value.slice(5) : '');
        }

        setDataNascimento(value);
    };

    // Lida com a mudança de valor no campo telefone
    const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        let formattedValue = value;

        // Limita o tamanho do telefone a 11 dígitos
        if (value.length > 11) {
            formattedValue = value.slice(0, 11);
        }

        // Formata o telefone conforme o usuário digita
        if (value.length > 2) {
            formattedValue = `(${value.slice(0, 2)})${value.length > 2 ? ' ' + value.slice(2) : ''}`;
        }
        if (value.length > 7) {
            formattedValue = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
        }

        setTelefone(formattedValue);
    };

    // Lida com o envio do formulário de cadastro
    const handleCadastro = async () => {
        if (validarFormulario()) {
            setLoading(true);
            setSuccess(false);
            try {
                let dataFormatada;
                try {
                    dataFormatada = formatarDataParaAPI(dataNascimento);
                } catch {
                    setErros({
                        ...erros,
                        dataNascimento: 'Formato de data inválido. Use dd/mm/aaaa.'
                    });
                    return;
                }

                // Criação do objeto de dados para enviar para a API
                const dadosCadastro: CadastroUsuario = {
                    nomeCompleto: nome.trim(),
                    dataNascimento: dataFormatada,
                    email: email.trim().toLowerCase(),
                    numeroTelefone: telefone.replace(/\D/g, ""),
                    senha: senha,
                    confirmarSenha: confirmarSenha,
                    genero: genero.charAt(0).toUpperCase() + genero.slice(1).toLowerCase(),
                };

                // Envio dos dados para a API
                const response: ApiResponse = await cadastrarUsuario(dadosCadastro);
                
                switch (response.statusCode) {
                    case 409:
                        setErros({
                            ...erros,
                            global: 'Este email já está cadastrado. Por favor, utilize outro email.'
                        });
                        break;
                    case 400:
                        setErros({
                            ...erros,
                            global: 'Dados inválidos. Verifique as informações e tente novamente.'
                        });
                        break;
                    case 429:
                        setErros({
                            ...erros,
                            global: 'Muitas tentativas. Aguarde alguns minutos e tente novamente.'
                        });
                        break;
                    case 503:
                        setErros({
                            ...erros,
                            global: 'Sistema temporariamente indisponível. Tente novamente em alguns instantes.'
                        });
                        break;
                    case 200:
                    case 201:
                        setSuccess(true);
                        setTimeout(() => {
                            window.location.href = "/formulario";
                        }, 2000);
                        break;
                    default:
                        setErros({
                            ...erros,
                            global: 'Não foi possível realizar o cadastro. Por favor, tente novamente mais tarde.'
                        });
                }

            } catch {
                // Tratamento de erro de conexão
                if (!navigator.onLine) {
                    setErros({
                        ...erros,
                        global: 'Sem conexão com internet. Verifique sua conexão e tente novamente.'
                    });
                } else {
                    setErros({
                        ...erros,
                        global: 'Ocorreu um erro inesperado. Por favor, tente novamente em alguns instantes.'
                    });
                }
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 relative overflow-hidden px-4 sm:px-8 md:px-16 lg:px-32">
            <div className="bg-gray-900 p-8 sm:p-12 rounded-3xl shadow-lg w-full max-w-3xl">
                <h2 className="text-white text-3xl sm:text-4xl font-bold mb-6 text-center">Cadastre-se</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-white text-base mb-2">Nome Completo:</label>
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Digite seu nome"
                            className="w-full px-6 py-4 bg-gray-800/50 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500"
                        />
                        {erros.nome && <p className="text-red-500 text-sm mt-1">{erros.nome}</p>}
                    </div>

                    <div>
                        <label className="block text-white text-base mb-2">Data de nascimento:</label>
                        <input
                            type="text"
                            value={dataNascimento}
                            onChange={handleDataNascimentoChange}
                            placeholder="dd/mm/aaaa"
                            maxLength={10}
                            className="w-full px-6 py-4 bg-gray-800/50 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500"
                        />
                        {erros.dataNascimento && <p className="text-red-500 text-sm mt-1">{erros.dataNascimento}</p>}
                    </div>

                    <div>
                        <label className="block text-white text-base mb-2">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Digite seu email"
                            className="w-full px-6 py-4 bg-gray-800/50 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500"
                        />
                        {erros.email && <p className="text-red-500 text-sm mt-1">{erros.email}</p>}
                    </div>

                    <div>
                        <label className="block text-white text-base mb-2">Número de telefone:</label>
                        <input
                            type="text"
                            value={telefone}
                            onChange={handleTelefoneChange}
                            placeholder="(00) 00000-0000"
                            maxLength={15}
                            className="w-full px-6 py-4 bg-gray-800/50 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500"
                        />
                        {erros.telefone && <p className="text-red-500 text-sm mt-1">{erros.telefone}</p>}
                    </div>

                    <div>
                        <label className="block text-white text-base mb-2">Senha:</label>
                        <input
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            placeholder="Digite sua senha"
                            className="w-full px-6 py-4 bg-gray-800/50 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500"
                        />
                        {erros.senha && <p className="text-red-500 text-sm mt-1">{erros.senha}</p>}
                    </div>

                    <div>
                        <label className="block text-white text-base mb-2">Confirme sua senha:</label>
                        <input
                            type="password"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            placeholder="Confirme a senha"
                            className="w-full px-6 py-4 bg-gray-800/50 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500"
                        />
                        {erros.confirmarSenha && <p className="text-red-500 text-sm mt-1">{erros.confirmarSenha}</p>}
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-white text-base mb-2">Gênero:</label>
                    <select
                        value={genero}
                        onChange={(e) => setGenero(e.target.value)}
                        className="w-full px-6 py-4 bg-gray-800/50 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 focus:bg-gray-800"
                    >
                        <option value="" disabled hidden>Selecione o gênero</option>
                        <option value="masculino">Masculino</option>
                        <option value="feminino">Feminino</option>
                        <option value="outro">Outro</option>
                    </select>
                    {erros.genero && <p className="text-red-500 text-sm mt-1">{erros.genero}</p>}
                </div>

                <button
                    onClick={handleCadastro}
                    className="w-full py-4 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-500 transition duration-300 flex items-center justify-center"
                    disabled={loading}
                >
                    {loading ? <AiOutlineLoading3Quarters className="animate-spin" size={24} /> : 'Cadastrar'}
                </button>

                {success && <p className="text-green-500 text-sm mt-4 text-center">Cadastro realizado com sucesso! Redirecionando...</p>}
                {erros.global && <p className="text-red-500 text-sm mt-1 text-center">{erros.global}</p>}

                <div className="mt-4 text-center">
                    <span className="text-gray-400">Já tem conta? </span>
                    <span 
                        className="text-purple-500 hover:underline cursor-pointer"
                        onClick={() => window.location.href = "/login"}
                    >
                        Faça login
                    </span>
                </div>
            </div>
        </div>
    );
}
