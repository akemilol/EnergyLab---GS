'use client'

import { FaHome } from 'react-icons/fa';

// Botão de voltar ao inicio mais longo
export default function Voltar() {
    return (
    <div className="fixed bottom-4 left-4">
        <button
        onClick={() => window.location.href = "/"} 
        className="flex items-center space-x-2 px-6 py-3 rounded-lg text-white bg-purple-600 shadow-md hover:bg-purple-500 transition duration-300">
        <FaHome size={24} className="text-white" />
        <span className="font-bold">Voltar ao Inicio</span>
        </button>
    </div>
    );
};