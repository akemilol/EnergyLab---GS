'use client'

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function MenuLogin() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter(); 

    // Valida o formato do email
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Verifica se a senha tem pelo menos 6 caracteres
    const validateSenha = (senha: string) => {
        return senha.length >= 6;
    };

    // Gerencia a lógica de login
    const handleLogin = () => {
        if (!validateEmail(email)) {
            setError('Por favor, insira um email válido.');
            return;
        }
        if (!validateSenha(senha)) {
            setError('A senha deve ter pelo menos 6 caracteres.');
            return;
        }
        setError('');
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            router.push('/formulario'); 
        }, 2000);
    };

    return (
        // Container principal da página
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 relative overflow-hidden px-4 sm:px-8 md:px-16 lg:px-32">
            <div className="relative w-full max-w-[1920px] flex flex-col lg:flex-row items-center justify-between lg:px-32">
                <div className="bg-gray-900 p-8 sm:p-12 rounded-3xl shadow-lg w-full max-w-md lg:max-w-[500px] z-20">
                    <h2 className="text-white text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center">Seja Bem vindo</h2>

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

                    <div className="space-y-4 sm:space-y-6">
                        <div>
                            <label className="block text-white text-base sm:text-lg mb-2 sm:mb-3">Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                placeholder="Digite seu email"
                                className="w-full px-6 py-4 sm:px-8 sm:py-5 bg-gray-800/50 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 text-base sm:text-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-white text-base sm:text-lg mb-2 sm:mb-3">Senha:</label>
                            <input
                                type="password"
                                value={senha}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSenha(e.target.value)}
                                placeholder="Digite sua senha"
                                className="w-full px-6 py-4 sm:px-8 sm:py-5 bg-gray-800/50 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 text-base sm:text-lg"
                            />
                        </div>
                    </div>

                    {error && <div className="text-purple-600 text-sm mt-4">{error}</div>}

                    <div className="mt-4 sm:mt-6 mb-6 sm:mb-8 text-sm sm:text-base text-center">
                        <span className="text-gray-400">Não tem conta? </span>
                        <span className="text-purple-500 hover:underline cursor-pointer" onClick={() => window.location.href = '/cadastro'}>Acesse aqui</span>
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

                {/* Imagem decorativa */}
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