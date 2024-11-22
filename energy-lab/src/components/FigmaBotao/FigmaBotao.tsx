'use client'

import { FaFigma } from 'react-icons/fa';

// Botão do repositorio do Figma.
export default function FigmaButton() {
return (
    <div className="flex justify-center items-start ">

    {/* Botão de acesso ao repositorio do Figma */}
<button
    onClick={() => window.open("https://www.figma.com/design/a7L7lumVQDi9Nm2wByIBKz/EnergyLab?node-id=1-2&t=LDuOjufsuskx0eMN-1", "_blank")}
    className="flex items-center space-x-2 px-4 py-3 rounded-lg text-black bg-zinc-300 shadow-md hover:bg-zinc-400 transition duration-300"
    >
    <FaFigma size={24} className="text-[#F24E1E]" />
    <span className="font-medium">Acesso ao repositório</span>
    </button>
    </div>
);
};