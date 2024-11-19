"use client";

import { useRouter } from "next/navigation";
import { FiUserPlus, FiGrid } from "react-icons/fi";

export default function FormularioIndex() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 px-4">
      <div className="bg-gray-900 p-8 sm:p-12 rounded-3xl shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Bem-vindo ao Formulário
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Escolha uma das opções abaixo para continuar:
        </p>
        <div className="space-y-4">

          <button
            onClick={() => router.push("/formulario/cad-formulario")}
            className="w-full flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition duration-300"
          >
            <FiUserPlus size={20} />
            Ir para Cadastro
          </button>


          <button
            onClick={() => router.push("/formulario/dashboard")}
            className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg transition duration-300"
          >
            <FiGrid size={20} />
            Ir para Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
