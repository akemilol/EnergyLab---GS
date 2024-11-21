import { FC } from 'react';
import { FaCode, FaHourglass, FaUser, FaExclamationTriangle, FaGlobe, FaAngleDoubleDown } from 'react-icons/fa';

const Beneficios: FC = () => {
  const textos = [
    { icon: <FaCode />, text: 'Ferramentas básicas para começar a gerenciar seu consumo.' },
    { icon: <FaHourglass />, text: 'Gráficos detalhados e análises personalizadas' },
    { icon: <FaUser />, text: 'Soluções completas para pequenas empresas' },
    { icon: <FaExclamationTriangle />, text: 'Funcionalidades customizadas sob consulta para grandes negócios' },
    { icon: <FaGlobe />, text: 'Invista em sustentabilidade e eficiência energética hoje mesmo!' },
  ];

  return (
    <div className="max-w-full md:max-w-[80rem] lg:max-w-[113rem] mx-auto text-white py-10 px-6">
      <h2 className="text-3xl font-bold mb-6">Benefícios:</h2>
      <div className="flex flex-col md:flex-row md:justify-between md:space-x-4 space-y-4 md:space-y-0">
        {textos.map((beneficio, index) => (
          <div
            key={index}
            className="flex items-center p-6 border border-white rounded-lg text-left space-x-4 md:w-1/5 w-full">
            <div className="text-2xl">
              {beneficio.icon}
            </div>
            <p className="text-sm">{beneficio.text}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <FaAngleDoubleDown className="text-6xl animate-bounce" />
      </div>
    </div>
  );
}

export default Beneficios;