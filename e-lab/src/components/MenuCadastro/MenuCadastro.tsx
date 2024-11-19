'use client';

import { useState } from 'react';

interface Erros {
    nome?: string;
    dataNascimento?: string;
    email?: string;
    telefone?: string;
    senha?: string;
    confirmarSenha?: string;
    genero?: string;
}

export default function MenuCadastro() {
    const [nome, setNome] = useState<string>('');
    const [dataNascimento, setDataNascimento] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [telefone, setTelefone] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [confirmarSenha, setConfirmarSenha] = useState<string>('');
    const [genero, setGenero] = useState<string>('');
    const [erros, setErros] = useState<Erros>({});

    const validarFormulario = () => {
        const novosErros: Erros = {};

        if (!nome.trim()) {
            novosErros.nome = 'Por favor, preencha o nome completo.';
        }

        if (!dataNascimento.trim() || !/^\d{2}\/\d{2}\/\d{4}$/.test(dataNascimento)) {
            novosErros.dataNascimento = 'Por favor, preencha a data de nascimento no formato correto (dd/mm/yyyy).';
        }

        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            novosErros.email = 'Por favor, preencha um email válido.';
        }

        if (!telefone.trim() || !/^\(\d{2}\) \d{5}-\d{4}$/.test(telefone)) {
            novosErros.telefone = 'Por favor, preencha o número de telefone no formato correto ((00) 00000-0000).';
        }

        if (!senha.trim()) {
            novosErros.senha = 'Por favor, preencha a senha.';
        } else if (senha.length < 6) {
            novosErros.senha = 'A senha deve ter no mínimo 6 dígitos.';
        }

        if (!confirmarSenha.trim()) {
            novosErros.confirmarSenha = 'Por favor, confirme a senha.';
        } else if (senha !== confirmarSenha) {
            novosErros.confirmarSenha = 'As senhas não coincidem. Por favor, verifique.';
        }

        if (!genero) {
            novosErros.genero = 'Por favor, selecione o gênero.';
        }

        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
    };

    const handleCadastro = () => {
        if (validarFormulario()) {
            window.location.href = '/formulario';
        }
    };

    const handleDataNascimentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        let formattedValue = value;
        if (value.length >= 3 && value.length <= 4) {
            formattedValue = `${value.slice(0, 2)}/${value.slice(2)}`;
        } else if (value.length > 4) {
            formattedValue = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4, 8)}`;
        }
        setDataNascimento(formattedValue);
    };

    const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        let formattedValue = value;
        if (value.length > 2 && value.length <= 7) {
            formattedValue = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else if (value.length > 7) {
            formattedValue = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
        }
        setTelefone(formattedValue);
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
                            placeholder="dd/mm/yyyy"
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
                        <label className="block text-white text-base mb-2">Numero de telefone:</label>
                        <input
                            type="text"
                            value={telefone}
                            onChange={handleTelefoneChange}
                            placeholder="(00) 00000-0000"
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
                    <select value={genero} onChange={(e) => setGenero(e.target.value)} className="w-full px-6 py-4 bg-gray-800/50 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 focus:bg-gray-800">
                        <option value="" disabled hidden>Gênero</option>
                        <option value="masculino">Masculino</option>
                        <option value="feminino">Feminino</option>
                        <option value="outro">Outro</option>
                    </select>
                    {erros.genero && <p className="text-red-500 text-sm mt-1">{erros.genero}</p>}
                </div>

                <button
                    onClick={handleCadastro}
                    className="w-full py-4 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-500 transition duration-300"
                >
                    Entrar
                </button>
            </div>
        </div>
    );
}
