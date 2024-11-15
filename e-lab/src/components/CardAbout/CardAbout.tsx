import Image from 'next/image';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

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

const CardAbout: React.FC<CardAboutProps> = ({
  nome, sobrenome,
  turma,
  rm,
  textosobre,
  imagem,
  imagemCapa,
  github,
  linkedin,
}) => {
  return (
    <div className="bg-gray-300 text-indigo-900 rounded-lg p-6 shadow-lg w-72 relative">
      <div className="relative w-full h-32 mb-8 rounded-t-lg overflow-hidden">
        <Image
          src={imagemCapa}
          alt={`Imagem de ${nome} ${sobrenome}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-24 h-24 mb-4 overflow-hidden rounded-lg">
        <Image
          src={imagem}
          alt={`Imagem de ${nome} ${sobrenome}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="mt-12 text-center">
        <h3 className="text-xl font-bold mb-1">{nome}</h3>
        <h4 className="text-lg font-semibold  mb-2">{sobrenome}</h4>
        <p className="text-sm font-semibold text-indigo-900">Turma: {turma}</p>
        <p className="text-sm font-semibold text-indigo-900">RM: {rm}</p>
        <p className="mt-4 mb-4 font-medium">{textosobre}</p>
        <div className="flex justify-center gap-4 mt-4">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-900 hover:text-gray-400"
          >
            <FaGithub size={24} />
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-900 hover:text-gray-400"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

const equipeMembros = [
  {
    nome: "Valéria",
    sobrenome: "Conceição Dos Santos",
    turma: "1TDSPM",
    rm: "55177",
    textosobre: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    imagem: "/img/valeria.jpg",
    imagemCapa: "/img/capa.jpg",
    github: "",
    linkedin: ""
  },
  {
    nome: "Mirela",
    sobrenome: "Pinheiro Silva Rodrigues",
    turma: "1TDSPM",
    rm: "558191",
    textosobre: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    imagem: "/img/mirela.jpg",
    imagemCapa: "",
    github: "",
    linkedin: ""
  },
  {
    nome: "João",
    sobrenome: "Amorim Brito Virgens",
    turma: "1TDSPV",
    rm: "559213",
    textosobre: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    imagem: "/img/joao.jpg",
    imagemCapa: "",
    github: "",
    linkedin: ""
  },
];

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
