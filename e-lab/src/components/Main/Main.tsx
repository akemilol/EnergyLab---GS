import { FC } from 'react';
import { FaCode, FaHourglass, FaUser, FaExclamationTriangle, FaGlobe, FaAngleDoubleDown } from 'react-icons/fa';

const BenefitsSection: FC = () => {
  const benefits = [
    { icon: <FaCode />, text: 'Lorem Ipsum is simply dummy text' },
    { icon: <FaHourglass />, text: 'Lorem Ipsum is simply dummy text' },
    { icon: <FaUser />, text: 'Lorem Ipsum is simply dummy text' },
    { icon: <FaExclamationTriangle />, text: 'Lorem Ipsum is simply dummy text' },
    { icon: <FaGlobe />, text: 'Lorem Ipsum is simply dummy text' },
  ];

  return (
    <div className="text-white py-10 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6">Benefícios:</h2>
        <div className="flex flex-col md:flex-row md:justify-between md:space-x-4 space-y-4 md:space-y-0">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center p-6 border border-white rounded-lg text-left space-x-4 md:w-1/5 w-full"
            >
              <div className="text-2xl">
                {benefit.icon}
              </div>
              <p className="text-sm">{benefit.text}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <FaAngleDoubleDown className="text-6xl animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
