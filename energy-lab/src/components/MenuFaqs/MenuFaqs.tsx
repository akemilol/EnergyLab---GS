import Image from 'next/image';

const MenuFaqs = () => {
return (
    <div className="w-full bg-black p-10 text-white">
    <div className="mt-20">
    <div className="flex flex-col lg:flex-row gap-8 max-w-[113rem] mx-auto">

        <div className="flex-1 flex items-center justify-center">
        <Image
            src="/img/iconFaQs.svg"
            alt="Ilustração de pessoa no computador"
            width={600}
            height={400}
            className="rounded-lg"
        />
        </div>

        <div className="flex-1 space-y-6">
        <h1 className="text-2xl font-bold mb-6">FAQs – EnergyLab</h1>

        <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-lg font-semibold">  O que é a EnergyLab? </h2>
            <p className="text-gray-400 mt-2">
            A EnergyLab é uma plataforma digital que ajuda pessoas e empresas a entenderem e otimizarem seu consumo energético. Por meio de gráficos interativos, relatórios detalhados e análises personalizadas, a EnergyLab promove eficiência energética e sustentabilidade, ajudando você a economizar e reduzir seu impacto ambiental.
            </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-lg font-semibold"> Como a EnergyLab ajuda a reduzir meu consumo de energia? </h2>
            <p className="text-gray-400 mt-2">
            Analisamos seu consumo energético com base nos dados fornecidos e identifica desperdícios ou oportunidades de economia. Além disso, oferece relatórios detalhados e notificações inteligentes para sugerir mudanças práticas que otimizam seu uso de energia, resultando em economia e menor impacto ambiental.
            </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-lg font-semibold"> Quem pode usar a EnergyLab? </h2>
            <p className="text-gray-400 mt-2">
            A plataforma é ideal para residências, pequenas empresas, grandes indústrias e qualquer pessoa ou organização que deseja melhorar sua eficiência energética. A EnergyLab adapta-se às suas necessidades, oferecendo planos acessíveis e funcionalidades personalizadas para diferentes perfis de usuários.
            </p>
        </div>

        </div>

    </div>
    </div>
    </div>
);
};

export default MenuFaqs;