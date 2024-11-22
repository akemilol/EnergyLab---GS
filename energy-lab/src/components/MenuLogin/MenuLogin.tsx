"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { loginUsuario } from '../../api/route';

interface LoginData {
    email: string;
    senha: string;
}

interface ErrorMessages {
    [key: string]: string;
}

// Mensagens de erro personalizadas para diferentes tipos de erro
const errorMessages: ErrorMessages = {
    invalidEmail: 'Por favor, insira um endereço de email válido',
    emptyEmail: 'O campo de email não pode estar vazio',
    invalidPassword: 'A senha deve ter pelo menos 6 caracteres',
    emptyPassword: 'O campo de senha não pode estar vazio',
    networkError: 'Não foi possível conectar ao servidor. Verifique sua conexão',
    unauthorized: 'Email ou senha incorretos',
    serverError: 'Ocorreu um problema no servidor. Tente novamente em alguns minutos',
    default: 'Ocorreu um erro inesperado. Por favor, tente novamente'
};

export default function MenuLogin() {
    // Definindo estados locais para email, senha, erro, carregamento e sucesso
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const router = useRouter(); // Hook para redirecionamento de rotas

    // Função para validar o formato do email
    const validateEmail = (email: string) => {
        if (!email) {
            throw new Error('emptyEmail'); 
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('invalidEmail'); 
        }
        return true;
    };

    // Função para validar a senha
    const validateSenha = (senha: string) => {
        if (!senha) {
            throw new Error('emptyPassword'); 
        }
        if (senha.length < 6) {
            throw new Error('invalidPassword');
        }
        return true;
    };

    // Função principal para lidar com o login
    const handleLogin = async () => {
        try {
            setError(''); 
            setLoading(true); 
            setSuccess(false); 

            // Valida email e senha
            validateEmail(email);
            validateSenha(senha);

            // Prepara os dados para o login
            const loginData: LoginData = {
                email: email.trim().toLowerCase(), 
                senha: senha
            };
            
            await loginUsuario(loginData); 
            setSuccess(true); 
            
            // Redireciona para a página do formulário após 2 segundos
            setTimeout(() => {
                router.push('/formulario');
            }, 2000);

        } catch (error) {
            console.error("Erro no login:", error);
            
            // Lida com diferentes tipos de erro e define a mensagem apropriada
            if (error instanceof Error) {
                if (errorMessages[error.message]) {
                    setError(errorMessages[error.message]);
                    return;
                }

                if (error.message.includes('401')) {
                    setError(errorMessages.unauthorized);
                } else if (error.message.includes('500')) {
                    setError(errorMessages.serverError);
                } else if (error.message.includes('network')) {
                    setError(errorMessages.networkError);
                } else {
                    setError(errorMessages.default);
                }
            } else {
                setError(errorMessages.default);
            }
        } finally {
            setLoading(false); // Desativa o carregamento
        }
    };

    // Função para lidar com a tecla Enter ao digitar email ou senha
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleLogin(); 
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 relative overflow-hidden px-4 sm:px-8 md:px-16 lg:px-32">
            <div className="relative w-full max-w-[1920px] flex flex-col lg:flex-row items-center justify-between lg:px-32">
                {/* Caixa de login */}
                <div className="bg-gray-900 p-8 sm:p-12 rounded-3xl shadow-lg w-full max-w-md lg:max-w-[500px] z-20">
                    <h2 className="text-white text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center">Seja Bem vindo</h2>

                    {/* Icone de login */}
                    <div className="flex justify-center mb-8 sm:mb-10">
                        <div className="rounded-full bg-gray-800 p-6 w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center border border-gray-400">
                            <div className="relative">
                                <Image
                                    src="/img/LoginIcon.svg"
                                    alt="Login Icon"
                                    width={80}
                                    height={80}
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Campos de entrada: Email e Senha */}
                    <div className="space-y-4 sm:space-y-6">
                        <div>
                            <label className="block text-white text-base sm:text-lg mb-2 sm:mb-3">Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                                onKeyPress={handleKeyPress} 
                                placeholder="Digite seu email"
                                className="w-full px-6 py-4 sm:px-8 sm:py-5 bg-gray-800/50 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 text-base sm:text-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-white text-base sm:text-lg mb-2 sm:mb-3">Senha:</label>
                            <input
                                type="password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)} 
                                onKeyPress={handleKeyPress} 
                                placeholder="Digite sua senha"
                                className="w-full px-6 py-4 sm:px-8 sm:py-5 bg-gray-800/50 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 text-base sm:text-lg"
                            />
                        </div>
                    </div>

                    {/* Mensagens de erro e sucesso */}
                    {error && (
                        <div className="mt-4 p-3 bg-red-900/30 border border-red-700 rounded-lg">
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    )}
                    {success && (
                        <div className="mt-4 p-3 bg-green-900/30 border border-green-700 rounded-lg">
                            <p className="text-green-400 text-sm">Login realizado com sucesso! Redirecionando...</p>
                        </div>
                    )}

                    {/* Link para cadastro */}
                    <div className="mt-4 sm:mt-6 mb-6 sm:mb-8 text-sm sm:text-base text-center">
                        <span className="text-gray-400">Não tem conta? </span>
                        <span 
                            className="text-purple-500 hover:underline cursor-pointer" 
                            onClick={() => router.push('/cadastro')} 
                        >
                            Acesse aqui
                        </span>
                    </div>

                    {/* Botão de login */}
                    <button
                        onClick={handleLogin} 
                        className="w-full py-3 sm:py-4 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-500 transition duration-300 text-base sm:text-lg flex items-center justify-center"
                        disabled={loading} 
                    >
                        {loading ? <AiOutlineLoading3Quarters className="animate-spin" size={24} /> : 'Entrar'}
                    </button>
                </div>

                {/* Imagem decorativa ao lado direito */}
                <div className="absolute lg:relative right=0 lg:right-16 bottom-0 z-10 hidden md:block lg:block">
                    <div className="relative">
                        <Image
                            src="/img/LoginComputer.svg"
                            alt="Character"
                            width={1000}
                            height={1000}
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
