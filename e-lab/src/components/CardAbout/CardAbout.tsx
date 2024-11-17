'use client'

import Image from 'next/image';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

// Interface para tipar as propriedades do CardAbout.
interface CardAboutProps {
  nome: string;
  sobrenome: string;
  turma: string;
  rm: string;
  textosobre: string;
  imagem: string;
  imagemCapa: string;
  github: string;
  linkedin: string;
}

// Componente com informações do membro.
const CardAbout: React.FC<CardAboutProps> = ({
  nome,
  sobrenome,
  turma,
  rm,
  textosobre,
  imagem,
  imagemCapa,
  github,
  linkedin,
}) => {
  
  // links dos cards
  const handleOpenLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const textoNegrito = "Responsável pelas matérias de:";

  return (
    <div className="bg-stone-100 text-indigo-950 rounded-lg p-6 shadow-lg w-80 relative transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">

      <div className="relative w-full h-44 mb-16 rounded-t-lg overflow-hidden">
        <Image
          src={imagemCapa}
          alt={`Imagem de ${nome} ${sobrenome}`}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-110"
        />
      </div>

      <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-32 h-32 mb-4 overflow-hidden rounded-lg">
        <Image
          src={imagem}
          alt={`Imagem de ${nome} ${sobrenome}`}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-110"
        />
      </div>

      <div className="mt-0 text-center">
        <div className="mt-4">
          <h3 className="text-2xl font-bold mb-0">{nome}</h3>
          <h4 className="text-xl font-semibold mb-4">{sobrenome}</h4>
        </div>

        <p className="text-sm font-semibold text-indigo-900">Turma: {turma}</p>
        <p className="text-sm font-semibold text-indigo-900 mb-4">RM: {rm}</p>

        <div className="flex justify-center gap-6 mb-4">
          <button
            onClick={() => handleOpenLink(github)}
            className="hover:text-gray-400 transition-transform duration-300 hover:scale-110"
            style={{ color: '#181717' }}
          >
            <FaGithub size={32} />
          </button>
          <button
            onClick={() => handleOpenLink(linkedin)}
            className="hover:text-gray-400 transition-transform duration-300 hover:scale-110"
            style={{ color: '#0077B5' }}
          >
            <FaLinkedin size={32} />
          </button>
        </div>


        <p className="font-medium">
          <span className="font-bold">{textoNegrito}</span> {textosobre.replace(`${textoNegrito} `, '')}
        </p>
      </div>
    </div>
  );
};

// Array de dados dos membros da equipe.
const equipeMembros = [
  {
    nome: "Valéria",
    sobrenome: "Conceição Dos Santos",
    turma: "1TDSPM",
    rm: "55177",
    textosobre:
      "Responsável pelas matérias de: Software engineering and business model e Front-end design engineering",
    imagem: "/img/valeria.jpg",
    imagemCapa: "/img/capa1.jpeg",
    github: "https://github.com/akemilol",
    linkedin: "https://www.linkedin.com/in/val%C3%A9riasantos/",
  },
  {
    nome: "Mirela",
    sobrenome: "Pinheiro Silva Rodrigues",
    turma: "1TDSPM",
    rm: "558191",
    textosobre:
      "Responsável pelas matérias de: Artificial Intelligence & Chatbot e Building Relational Database",
    imagem: "/img/mirela.jpeg",
    imagemCapa: "/img/capa2.jpeg",
    github: "https://github.com/mirelapsr",
    linkedin: "https://www.linkedin.com/in/mirela-p-s-rodrigues-26344b2b6/",
  },
  {
    nome: "João",
    sobrenome: "Amorim Brito Virgens",
    turma: "1TDSPV",
    rm: "559213",
    textosobre:
      "Responsável pelas matérias de: Domain Driven Design Using Java e Computational Thinking Using Python",
    imagem: "/img/joao.jpeg",
    imagemCapa: "/img/capa3.jpeg",
    github: "https://github.com/JPAmorimBV",
    linkedin: "https://www.linkedin.com/in/joao-pedro-amorim-557472227/",
  },
];

// Renderiza os cartões dos membros da equipe.
const SobreNos: React.FC = () => {
  return (
    <div className="flex gap-8 justify-center items-center flex-wrap p-8">
      {equipeMembros.map((membro, index) => (
        <CardAbout
          key={index}
          nome={membro.nome}
          sobrenome={membro.sobrenome}
          turma={membro.turma}
          rm={membro.rm}
          textosobre={membro.textosobre}
          imagem={membro.imagem}
          imagemCapa={membro.imagemCapa}
          github={membro.github}
          linkedin={membro.linkedin}
        />
      ))}
    </div>
  );
};

export default SobreNos;
