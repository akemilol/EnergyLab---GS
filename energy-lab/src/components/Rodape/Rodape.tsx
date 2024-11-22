import Link from 'next/link';

// Página do Rodapé

const Rodape = () => {
  return (
    <div className="bg-black flex justify-center">
      <footer
        className="bg-gradient-header text-white py-8 px-6 md:px-12 rounded-t-lg border-t-4 border-black w-full flex flex-col items-center space-y-4 max-w-[113rem] mx-auto">

        <nav className="flex space-x-8">
          <Link href="#navbar" className="hover:underline">
            Home
          </Link>
          <Link href="/quiz" className="hover:underline">
            Quiz
          </Link>
          <Link href="/sobrenos" className="hover:underline">
            Sobre nós
          </Link>
        </nav>

        <p className="text-sm text-center mt-4">
          © Todos os direitos reservados, Equipe EnergyLab.
        </p>
      </footer>
    </div>
  );
};

export default Rodape;