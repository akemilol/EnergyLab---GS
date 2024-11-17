'use client'

import { FaFigma } from 'react-icons/fa';

// Botão do repositorio do Figma.
export default function FigmaButton() {
return (
    <div className="flex justify-center items-start ">
    <button
        onClick={() => window.location.href = "#"} 
        className="flex items-center space-x-2 px-4 py-3 rounded-lg text-black bg-zinc-300 shadow-md hover:bg-zinc-400 transition duration-300">
        <FaFigma size={24} className="text-[#F24E1E]" />
        <span className="font-medium">Acesso ao repositorio</span>
    </button>
    </div>
);
};
