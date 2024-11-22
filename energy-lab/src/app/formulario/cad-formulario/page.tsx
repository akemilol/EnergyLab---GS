"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FiHome, FiMapPin, FiBox, FiUsers, FiSun, FiTv } from "react-icons/fi";
import BotaoHome from "@/components/BotaoHome/BotaoHome";

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


// Pagina de cadastro do formulário
export default function FormularioEnergia() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    eletrodomesticosPrincipais: "",
    principaisEletrodomesticos: {
      Tv: "não tenho",
      "Máquina de lavar": "não tenho",
      "Máquina de secar": "não tenho",
      "Chuveiro elétrico": "não tenho",
      "Ar condicionado": "não tenho",
      Geladeira: "não tenho",
      "Forno elétrico": "não tenho",
      "Air Fryer": "não tenho",
      Microondas: "não tenho",
    },
    regiao: "",
    area: "",
    totalEletrodomesticos: "",
    adultos: "",
    criancas: "",
    tipoMoradia: "",
    energiaRenovavel: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name in formData.principaisEletrodomesticos) {
      setFormData((prev) => ({
        ...prev,
        principaisEletrodomesticos: {
          ...prev.principaisEletrodomesticos,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    localStorage.setItem("formDataEnergia", JSON.stringify(formData));
    router.push("/formulario/dashboard");
  };

  const eletrodomesticos = [
    "Tv",
    "Máquina de lavar",
    "Máquina de secar",
    "Chuveiro elétrico",
    "Ar condicionado",
    "Geladeira",
    "Forno elétrico",
    "Air Fryer",
    "Microondas",
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 px-4">
      <div className="bg-gray-900 p-8 sm:p-12 rounded-3xl shadow-lg w-full max-w-3xl">
        <h2 className="text-white text-3xl sm:text-4xl font-bold mb-6 text-center">
          Dados da sua Residência
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="flex items-center gap-2 text-white text-base mb-2">
              <FiBox className="text-purple-500" /> Quantos eletrodomésticos principais existem na sua residência?
            </label>
            <input
              type="number"
              name="eletrodomesticosPrincipais"
              value={formData.eletrodomesticosPrincipais}
              onChange={handleChange}
              placeholder="Exemplo: 5"
              className="w-full px-6 py-4 bg-gray-800/50 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500"
              required
            />
          </div>


          <div>
            <label className="flex items-center gap-2 text-white text-base mb-2">
              <FiBox className="text-purple-500" /> Quantos eletrodomésticos, no total, existem na sua casa?
            </label>
            <input
              type="number"
              name="totalEletrodomesticos"
              value={formData.totalEletrodomesticos}
              onChange={handleChange}
              placeholder="Exemplo: 10"
              className="w-full px-6 py-4 bg-gray-800/50 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500"
              required
            />
          </div>


          <div>
            <label className="flex items-center gap-2 text-white text-base mb-4">
              <FiTv className="text-purple-500" /> Quantos principais eletrodomésticos você possui em sua residência?
            </label>
            <div className="space-y-4">
              {eletrodomesticos.map((eletro) => (
                <div key={eletro} className="space-y-2">
                  <label className="block text-white font-medium">{eletro}:</label>
                  <div className="flex items-center gap-4">
                    {["1", "2", "3 ou mais", "não tenho"].map((option) => (
                      <label
                        key={`${eletro}-${option}`}
                        className="flex items-center gap-2 text-gray-200"
                      >
                        <input
                          type="radio"
                          name={eletro}
                          value={option}
                          onChange={handleChange}
                          checked={
                            formData.principaisEletrodomesticos &&
                            formData.principaisEletrodomesticos[eletro] === option
                          }
                          className="w-5 h-5 text-purple-500 bg-gray-700 border-gray-600 focus:ring-purple-500"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-white text-base mb-2">
              <FiMapPin className="text-purple-500" /> Em qual região do país você mora?
            </label>
            <select
              name="regiao"
              value={formData.regiao}
              onChange={handleChange}
              className="w-full px-6 py-4 bg-gray-800/50 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500"
              required
            >
              <option value="" disabled hidden>
                Escolha uma região
              </option>
              <option value="norte">Norte</option>
              <option value="nordeste">Nordeste</option>
              <option value="centro-oeste">Centro-Oeste</option>
              <option value="sudeste">Sudeste</option>
              <option value="sul">Sul</option>
            </select>
          </div>


          <div>
            <label className="flex items-center gap-2 text-white text-base mb-2">
              <FiHome className="text-purple-500" /> Qual é a área total da sua residência (em metros quadrados)?
            </label>
            <div className="flex flex-wrap items-center gap-6 sm:gap-4">
              {[
                "25-30 m²",
                "30-50 m²",
                "70-100 m²",
                "100-150 m²",
                "> 200 m²",
              ].map((option) => (
                <label key={option} className="flex items-center gap-2 text-gray-200">
                  <input
                    type="radio"
                    name="area"
                    value={option}
                    onChange={handleChange}
                    className="w-5 h-5 text-purple-500 bg-gray-700 border-gray-600 focus:ring-purple-500"
                    required
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>


          <div>
            <label className="flex items-center gap-2 text-white text-base mb-2">
              <FiHome className="text-purple-500" /> Qual o tipo de moradia? (Casa, apartamento, etc.)
            </label>
            <select
              name="tipoMoradia"
              value={formData.tipoMoradia}
              onChange={handleChange}
              className="w-full px-6 py-4 bg-gray-800/50 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500"
              required
            >
              <option value="" disabled hidden>
                Escolha o tipo de moradia
              </option>
              <option value="casa">Casa</option>
              <option value="apartamento">Apartamento</option>
              <option value="sobrado">Sobrado</option>
              <option value="kitnet">Kitnet</option>
              <option value="outro">Outro</option>
            </select>
          </div>


          <div>
            <label className="flex items-center gap-2 text-white text-base mb-2">
              <FiUsers className="text-purple-500" /> Quantos adultos moram na residência?
            </label>
            <input
              type="number"
              name="adultos"
              value={formData.adultos}
              onChange={handleChange}
              placeholder="Exemplo: 2"
              className="w-full px-6 py-4 bg-gray-800/50 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500"
              required
            />
          </div>


          <div>
            <label className="flex items-center gap-2 text-white text-base mb-2">
              <FiUsers className="text-purple-500" /> Quantas crianças moram na residência?
            </label>
            <input
              type="number"
              name="criancas"
              value={formData.criancas}
              onChange={handleChange}
              placeholder="Exemplo: 1"
              className="w-full px-6 py-4 bg-gray-800/50 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500"
              required
            />
          </div>


          <div>
            <label className="flex items-center gap-2 text-white text-base mb-2">
              <FiSun className="text-purple-500" /> Você possui algum sistema de geração de energia renovável instalado?
            </label>
            <select
              name="energiaRenovavel"
              value={formData.energiaRenovavel}
              onChange={handleChange}
              className="w-full px-6 py-4 bg-gray-800/50 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500"
              required
            >
              <option value="" disabled hidden>
                Selecione
              </option>
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-500 transition duration-300"
          >
            Enviar e Ir para Dashboard
          </button>
        </form>
      </div>
      <BotaoHome />
    </div>
  );
}