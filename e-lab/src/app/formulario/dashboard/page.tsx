"use client";

import { useEffect, useState } from "react";

interface FormData {
  eletrodomesticosPrincipais: string;
  principaisEletrodomesticos: {
    [key: string]: string;
  };
  regiao: string;
  area: string;
  totalEletrodomesticos: string;
  adultos: string;
  criancas: string;
  tipoMoradia: string;
  energiaRenovavel: string;
}

export default function Dashboard() {
  const [formData, setFormData] = useState<FormData | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("formDataEnergia");
    if (data) {
      setFormData(JSON.parse(data));
    }
  }, []);

  if (!formData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 px-4">
        <div className="bg-gray-900 p-8 rounded-3xl shadow-lg w-full max-w-lg text-center">
          <h2 className="text-white text-3xl font-bold mb-4">Nenhum dado encontrado!</h2>
          <p className="text-gray-400">
            Por favor, preencha o formulário para visualizar os dados no dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 px-4 py-8">
      <h2 className="text-white text-3xl font-bold mb-6">Dashboard</h2>
      <div className="space-y-6 w-full max-w-4xl">

        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-purple-400 text-xl font-bold mb-2">Eletrodomésticos Principais</h3>
          <p className="text-white text-lg">
            Quantos eletrodomésticos principais existem na sua residência:{" "}
            <strong>{formData.eletrodomesticosPrincipais}</strong>
          </p>
        </div>


        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-purple-400 text-xl font-bold mb-2">Eletrodomésticos Totais</h3>
          <p className="text-white text-lg">
            Quantos eletrodomésticos, no total, existem na sua casa:{" "}
            <strong>{formData.totalEletrodomesticos}</strong>
          </p>
        </div>


        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-purple-400 text-xl font-bold mb-4">
            Principais Eletrodomésticos na Residência
          </h3>
          <ul className="space-y-2">
            {Object.entries(formData.principaisEletrodomesticos).map(([key, value]) => (
              <li key={key} className="flex justify-between text-white text-lg">
                <span>{key}:</span> <strong>{value}</strong>
              </li>
            ))}
          </ul>
        </div>


        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-purple-400 text-xl font-bold mb-2">Área da Residência</h3>
          <p className="text-white text-lg">
            A área total da sua residência é: <strong>{formData.area}</strong>
          </p>
        </div>


        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-purple-400 text-xl font-bold mb-2">Adultos na Residência</h3>
          <p className="text-white text-lg">
            Quantos adultos moram na residência: <strong>{formData.adultos}</strong>
          </p>
        </div>


        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-purple-400 text-xl font-bold mb-2">Crianças na Residência</h3>
          <p className="text-white text-lg">
            Quantas crianças moram na residência: <strong>{formData.criancas}</strong>
          </p>
        </div>


        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-purple-400 text-xl font-bold mb-2">Região</h3>
          <p className="text-white text-lg">
            Em qual região do país você mora: <strong>{formData.regiao}</strong>
          </p>
        </div>


        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-purple-400 text-xl font-bold mb-2">Tipo de Moradia</h3>
          <p className="text-white text-lg">
            O tipo de moradia é: <strong>{formData.tipoMoradia}</strong>
          </p>
        </div>


        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-purple-400 text-xl font-bold mb-2">Energia Renovável</h3>
          <p className="text-white text-lg">
            Possui sistema de geração de energia renovável:{" "}
            <strong>{formData.energiaRenovavel === "sim" ? "Sim" : "Não"}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
