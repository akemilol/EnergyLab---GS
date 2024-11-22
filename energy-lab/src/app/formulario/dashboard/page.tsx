"use client";

import { useEffect, useState, useRef } from "react";
import { Chart, registerables } from 'chart.js';
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

Chart.register(...registerables);

export default function Dashboard() {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [consumoTotal, setConsumoTotal] = useState<number>(0);
  const [emissaoCO2, setEmissaoCO2] = useState<number>(0);
  const [tipoCarbono, setTipoCarbono] = useState<string>('');
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const pieChartRef = useRef<HTMLCanvasElement | null>(null);
  const [itemMaisConsome, setItemMaisConsome] = useState<string>('');
  const [arvoresParaZerar, setArvoresParaZerar] = useState<number | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("formDataEnergia");
    if (data) {
      const parsedData: FormData = JSON.parse(data);
      setFormData(parsedData);
      calcularConsumo(parsedData);
    }
  }, []);

  const calcularConsumo = (data: FormData) => {
    const calcularArvoresParaZerar = (emissaoCO2: number) => {
      const CO2_ABSORVIDO_POR_ARVORE = 21; // kg CO₂/ano por árvore
      const arvoresNecessarias = Math.ceil(emissaoCO2 / CO2_ABSORVIDO_POR_ARVORE);
      setArvoresParaZerar(arvoresNecessarias);
    };

    const consumoEletrodomesticos: { [key: string]: number } = {
      "Tv": 15,
      "Máquina de lavar": 20,
      "Máquina de secar": 25,
      "Chuveiro elétrico": 100,
      "Ar condicionado": 150,
      "Geladeira": 40,
      "Forno elétrico": 30,
      "Air Fryer": 10,
      "Microondas": 12,
    };

    const fatorEmissao = 0.090; // kg CO₂/kWh

    let consumoTotal = 0;

    // Calcular consumo baseado nos principais eletrodomésticos
    Object.entries(data.principaisEletrodomesticos).forEach(([key, value]) => {
      if (value !== "não tenho") {
        const quantidade = value === "3 ou mais" ? 3 : parseInt(value);
        consumoTotal += (consumoEletrodomesticos[key] || 0) * quantidade;
      }
    });

    // Adicionar consumo baseado no número de eletrodomésticos principais e totais
    consumoTotal += parseInt(data.eletrodomesticosPrincipais) * 20;
    consumoTotal += parseInt(data.totalEletrodomesticos) * 10;

    // Ajustar consumo com base na região
    const consumoRegiao: { [key: string]: number } = {
      "norte": 80,
      "nordeste": 85,
      "centro-oeste": 90,
      "sudeste": 100,
      "sul": 110,
    };
    consumoTotal += consumoRegiao[data.regiao] || 0;

    // Ajustar consumo com base na área da residência
    const consumoArea: { [key: string]: number } = {
      "25-30 m²": 50,
      "30-50 m²": 70,
      "70-100 m²": 100,
      "100-150 m²": 150,
      "> 200 m²": 200,
    };
    consumoTotal += consumoArea[data.area] || 0;

    // Aplicar desconto de 20% se possuir energia renovável
    if (data.energiaRenovavel === "sim") {
      consumoTotal *= 0.8;
    }

    setConsumoTotal(consumoTotal);

    // Calcular emissão de CO2
    const emissaoCO2 = consumoTotal * fatorEmissao;
    setEmissaoCO2(emissaoCO2);

    // Determinar tipo de carbono
    if (emissaoCO2 < 50) {
      setTipoCarbono('Carbono Baixo');
    } else if (emissaoCO2 >= 50 && emissaoCO2 <= 100) {
      setTipoCarbono('Carbono Moderado');
      calcularArvoresParaZerar(emissaoCO2);
    } else {
      setTipoCarbono('Carbono Alto');
      calcularArvoresParaZerar(emissaoCO2);
    }
  };

  useEffect(() => {
    if (formData && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Eletrodomésticos Principais', 'Eletrodomésticos Totais', 'Área', 'Adultos', 'Crianças'],
            datasets: [
              {
                label: 'Dados da Residência',
                data: [
                  parseInt(formData.eletrodomesticosPrincipais),
                  parseInt(formData.totalEletrodomesticos),
                  parseInt(formData.area.match(/\d+/)?.[0] || '0'),
                  parseInt(formData.adultos),
                  parseInt(formData.criancas)
                ],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                max: 30,
                ticks: {
                  stepSize: 5
                }
              }
            },
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Dados da Residência'
              }
            }
          }
        });
      }
    }

    if (formData && pieChartRef.current) {
      const pieCtx = pieChartRef.current.getContext('2d');
      if (pieCtx) {
        const consumoEletrodomesticos: { [key: string]: number } = {
          "Tv": 15,
          "Máquina de lavar": 20,
          "Máquina de secar": 25,
          "Chuveiro elétrico": 100,
          "Ar condicionado": 150,
          "Geladeira": 40,
          "Forno elétrico": 30,
          "Air Fryer": 10,
          "Microondas": 12,
        };

        const eletrodomesticosSelecionados = Object.entries(formData.principaisEletrodomesticos).filter(([_, value]) => value !== "não tenho");
        const labels = eletrodomesticosSelecionados.map(([key]) => key);
        const data = eletrodomesticosSelecionados.map(([key, value]) => {
          const quantidade = value === "3 ou mais" ? 3 : parseInt(value);
          return (consumoEletrodomesticos[key] || 0) * quantidade;
        });

        // Determina o item que mais consome energia
        const maxConsumo = Math.max(...data);
        const itemMaisConsome = labels[data.indexOf(maxConsumo)];

        new Chart(pieCtx, {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Consumo de Energia por Eletrodoméstico (kWh/mês)',
                data: data,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(199, 199, 199, 0.2)',
                  'rgba(83, 102, 255, 0.2)',
                  'rgba(123, 159, 255, 0.2)'
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(199, 199, 199, 1)',
                  'rgba(83, 102, 255, 1)',
                  'rgba(123, 159, 255, 1)'
                ],
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Consumo de Energia e Emissões de CO₂ por Eletrodoméstico'
              }
            }
          }
        });

        // Atualiza o texto com o item que mais consome energia
        setItemMaisConsome(itemMaisConsome);
      }
    }
  }, [formData]);

  if (!formData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 px-4">
        <div className="bg-gray-900 p-8 rounded-3xl shadow-lg w-full max-w-lg ">
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
          <h3 className="text-purple-400 text-xl font-bold mb-2">Consumo Total de Energia</h3>
          <p className="text-white text-lg">
            O consumo total estimado de energia é: <span className="font-bold">{consumoTotal.toFixed(2)} kWh/mês</span>
          </p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-purple-400 text-xl font-bold mb-2">Emissão de CO₂</h3>
          <p className="text-white text-lg">
            A emissão estimada de CO₂ é: <span className="font-bold">{emissaoCO2.toFixed(2)} kg/mês</span>
          </p>
          <p className="text-white text-lg">
            Classificação: <span className="font-bold">{tipoCarbono}</span>
          </p>
          {arvoresParaZerar && tipoCarbono !== 'Carbono Baixo' && (
            <p className="text-white text-lg">
              Para compensar a emissão de CO₂, você precisaria plantar aproximadamente <span className="font-bold">{arvoresParaZerar} árvores</span>.
            </p>
          )}
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-purple-400 text-xl font-bold mb-2">Visualização dos Dados da Residência</h3>
          <canvas ref={chartRef} className="w-full h-64"></canvas>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-purple-400 text-xl font-bold mb-2">Item que mais consome energia</h3>
          <p className="text-white text-lg ">
            O item que mais consome energia, de acordo com o gráfico é: <span className="font-bold">{itemMaisConsome}</span>.
          </p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg flex flex-col">
          <h3 className="text-purple-400 text-xl font-bold mb-2">Consumo de Energia por Eletrodoméstico</h3>
          <canvas ref={pieChartRef} className="w-2/4 h-80 mx-auto"></canvas>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-purple-400 text-xl font-bold mb-2">Dicas para Reduzir o Gasto de Carbono</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg text-white">
              <h4 className="font-bold">Reduzir Consumo de Energia</h4>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg text-white">
              <h4 className="font-bold">Mudanças no Uso de Eletrodomésticos</h4>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg text-white">
              <h4 className="font-bold">Alterações na Mobilidade</h4>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg text-white">
              <h4 className="font-bold">Uso Racional da Água</h4>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg text-white">
              <h4 className="font-bold">Mudanças na Alimentação</h4>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg text-white">
              <h4 className="font-bold">Redução de Resíduos e Reciclagem</h4>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg text-white">
              <h4 className="font-bold">Economia de Transporte</h4>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg text-white">
              <h4 className="font-bold">Aproveitamento da Luz Natural</h4>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg text-white">
              <h4 className="font-bold">Troca de Hábitos de Consumo</h4>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg text-white">
              <h4 className="font-bold">Plantar árvores</h4>
            </div>
          </div>
        </div>
      </div>
      <BotaoHome />
    </div>
  );
}
