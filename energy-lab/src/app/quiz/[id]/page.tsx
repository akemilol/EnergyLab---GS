'use client';

import { useRouter } from 'next/navigation';

interface Pergunta {
  id: number;
  texto: string;
  opcoes: string[];
  respostaCorreta: number;
}

// Pagina ID com as perguntas do Quiz
const perguntas: Pergunta[] = [
  {
    id: 1,
    texto: 'Qual é a principal razão pela qual a transição para fontes de energia renovável é uma prioridade global?',
    opcoes: [
      'A) Reduzir os custos de produção de energia.',
      'B) Combater as mudanças climáticas e reduzir as emissões de carbono.',
      'C) Tornar a energia mais acessível apenas para grandes cidades.'
    ],
    respostaCorreta: 1,
  },
  {
    id: 2,
    texto: 'Quais são os principais tipos de energia renovável mencionados no projeto?',
    opcoes: [
      'A) Solar, eólica, nuclear e carvão.',
      'B) Solar, eólica, hidrelétrica e geotérmica.',
      'C) Biomassa, nuclear, solar e gás natural.'
    ],
    respostaCorreta: 1,
  },
  {
    id: 3,
    texto: 'Até que ano as fontes renováveis devem representar 51% da geração de energia no Brasil, segundo a EPE?',
    opcoes: ['A) 2025', 'B) 2028', 'C) 2030'],
    respostaCorreta: 2,
  },
  {
    id: 4,
    texto: 'Por que a inovação tecnológica é crucial na transição para um modelo energético mais sustentável?',
    opcoes: [
      'A) Para reduzir os custos de equipamentos de combustíveis fósseis.',
      'B) Para abrir caminho para novos modelos de geração e consumo de energia.',
      'C) Para criar dependência de tecnologias importadas.'
    ],
    respostaCorreta: 1,
  },
  {
    id: 5,
    texto: 'Como a energia renovável contribui para a justiça social?',
    opcoes: [
      'A) Reduzindo o uso de eletricidade nas cidades.',
      'B) Democratizando o acesso à eletricidade e melhorando a qualidade de vida em comunidades carentes.',
      'C) Tornando a energia apenas mais barata para as empresas.'
    ],
    respostaCorreta: 1,
  },
  {
    id: 6,
    texto: 'Qual é o impacto ambiental do uso contínuo de combustíveis fósseis?',
    opcoes: [
      'A) Redução das temperaturas globais.',
      'B) Aumento das emissões de gases de efeito estufa e aquecimento global.',
      'C) Melhor preservação das calotas polares.'
    ],
    respostaCorreta: 1,
  },
  {
    id: 7,
    texto: 'Que papel a eletrificação de veículos desempenha na transição energética?',
    opcoes: [
      'A) Aumenta o uso de combustíveis fósseis.',
      'B) Reduz a dependência de combustíveis fósseis e promove mobilidade sustentável.',
      'C) Não tem impacto significativo.'
    ],
    respostaCorreta: 1,
  },
  {
    id: 8,
    texto: 'Quais setores podem ser mais impactados pela transição para energias renováveis?',
    opcoes: [
      'A) Agricultura, turismo e esportes.',
      'B) Transporte, indústria e construção.',
      'C) Setor bancário e comércio eletrônico.'
    ],
    respostaCorreta: 1,
  },
  {
    id: 9,
    texto: 'O que são microgrids e como eles beneficiam comunidades remotas?',
    opcoes: [
      'A) São redes de transmissão de energia que conectam apenas grandes cidades.',
      'B) São sistemas locais de geração de energia que garantem autossuficiência em regiões remotas.',
      'C) São usinas nucleares em menor escala.'
    ],
    respostaCorreta: 1,
  },
  {
    id: 10,
    texto: 'Por que é importante a criação de soluções de armazenamento de energia eficientes?',
    opcoes: [
      'A) Para evitar a produção de energia renovável.',
      'B) Para garantir que a energia renovável seja armazenada e disponibilizada quando necessário.',
      'C) Para aumentar o consumo de combustíveis fósseis.'
    ],
    respostaCorreta: 1,
  },
];

interface PaginaQuizProps {
  params: { id: string };
}

const PaginaQuiz: React.FC<PaginaQuizProps> = ({ params }) => {
  const router = useRouter();
  const idPergunta = parseInt(params.id, 10) - 1;

  if (idPergunta < 0 || idPergunta >= perguntas.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 text-center px-4 py-8">
        <h1 className="text-3xl font-bold text-purple-400 mb-4">Fim do Quiz!</h1>
        <button
          className="mt-6 px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out shadow-md"
          onClick={() => router.push('/quiz/resultado')}
        >
          Ver Resultado
        </button>
      </div>
    );
  }

  const pergunta = perguntas[idPergunta];

  const salvarResposta = (correta: boolean) => {
    const respostasArmazenadas = localStorage.getItem('respostasQuiz');
    const respostas = respostasArmazenadas ? JSON.parse(respostasArmazenadas) : [];
    respostas.push({ pergunta: pergunta.texto, correta });
    localStorage.setItem('respostasQuiz', JSON.stringify(respostas));
    router.push(`/quiz/${idPergunta + 2}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 text-center px-4 py-8">
      <h1 className="text-3xl font-bold text-purple-400 mb-6">{pergunta.texto}</h1>
      <ul className="space-y-4">
        {pergunta.opcoes.map((opcao, index) => (
          <li key={index}>
            <button
              className="w-full max-w-md px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out shadow-md"
              onClick={() => salvarResposta(index === pergunta.respostaCorreta)}
            >
              {opcao}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaginaQuiz;
