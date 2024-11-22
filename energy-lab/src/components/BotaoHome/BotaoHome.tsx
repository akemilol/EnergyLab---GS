"use client"; 

import { useRouter } from "next/navigation";
import { AiOutlineHome } from "react-icons/ai"; 

const BotaoHome = () => {
const router = useRouter();

return (
    <button
    onClick={() => router.push("/")} 
    className="fixed bottom-4 left-4 bg-purple-500 text-white p-3 rounded-full shadow-lg hover:bg-purple-600 transition-colors flex items-center justify-center"
    >
    <AiOutlineHome size={24} /> 
    </button>
);
};

export default BotaoHome;