'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Resposta {
    pergunta: string;
    correta: boolean;
}

const ResultadoQuiz: React.FC = () => {
    const [respostas, setRespostas] = useState<Resposta[]>([]);
    const router = useRouter();

    useEffect(() => {
        const respostasArmazenadas = localStorage.getItem('respostasQuiz');
        if (respostasArmazenadas) {
        setRespostas(JSON.parse(respostasArmazenadas));
        } else {
        router.push('/quiz');
        }
    }, [router]);

    const respostasCertas = respostas.filter((resposta) => resposta.correta).length;

    // Pagina dos resultados de Quiz
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 text-center px-4 py-8">
        <h1 className="text-4xl font-bold text-purple-400 mb-6">Resultado do Quiz</h1>
        <p className="text-lg text-gray-300 mb-4">
            Você acertou <strong className="text-white">{respostasCertas}</strong> de <strong className="text-white">{respostas.length}</strong> perguntas!
        </p>
        <ul className="mb-8 space-y-4 w-full max-w-2xl">
            {respostas.map((resposta, index) => (
            <li
                key={index}
                className={`px-6 py-4 rounded-lg shadow-md text-lg font-medium text-center ${
                resposta.correta ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                }`}
            >
                {index + 1}. {resposta.pergunta} - {resposta.correta ? 'Correta' : 'Incorreta'}
            </li>
            ))}
        </ul>
        <button
            className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out shadow-md"
            onClick={() => {
            localStorage.removeItem('respostasQuiz');
            router.push('/quiz');
            }}
        >
            Refazer Quiz
        </button>
        </div>
);
};

export default ResultadoQuiz;