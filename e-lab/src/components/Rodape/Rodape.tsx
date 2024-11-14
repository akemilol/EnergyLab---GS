import React from 'react';

const Rodape = () => {
  return (
    <div className="bg-black flex justify-center">
      <footer
        style={{ maxWidth: '113rem' }}
        className="bg-gradient-header text-white py-8 px-6 md:px-12 rounded-t-lg border-t-4 border-black w-full flex flex-col items-center space-y-4"
      >

        <nav className="flex space-x-8">
          <a href="#" className="hover:underline">
            Home
          </a>
          <a href="#" className="hover:underline">
            FAQs
          </a>
          <a href="#" className="hover:underline">
            Sobre nós
          </a>
        </nav>


        <p className="text-sm text-center mt-4">
          © Todos os direitos reservados, Equipe EnergyLab.
        </p>
      </footer>
    </div>
  );
};

export default Rodape;
