'use client';

import Link from 'next/link';
import Image from 'next/image';

// Pagina inicial do Quiz
const Quiz: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 px-4 py-8">
      <Image src="/img/quiz.svg" alt="Imagem do Quiz" width={400} height={400} className="mb-6" />
      <h1 className="text-4xl font-bold text-purple-400 mb-6">Bem-vindo ao Quiz!</h1>
      <p className="text-lg text-gray-300 mb-8">
        Teste seus conhecimentos sobre energia renovável!
      </p>
      <Link href="/quiz/1">
        <button className="w-full max-w-md px-8 py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out shadow-md mb-4">
          Iniciar Quiz
        </button>
      </Link>
      
      <Link href="/">
        <button className="w-full max-w-md px-8 py-3 text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out shadow-md mb-4">
          Voltar
        </button>
      </Link>
    </div>
  );
};

export default Quiz;
