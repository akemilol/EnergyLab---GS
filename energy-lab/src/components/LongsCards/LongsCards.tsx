import { FaAngleDoubleDown } from 'react-icons/fa';

// Pagina de Cards na Landing Page
const LongsCards = () => {
    const titulos = [
        "Economia de Energia",
        "Sustentabilidade",
        "Interface Intuitiva",
        "Planejamento Preciso",
        "Monitoramento"
];

const paragrafos = [
    [
        "Descubra oportunidades de economia no seu consumo de energia com nossa análise detalhada. Identifique desperdícios e implemente ações para reduzir custos e otimizar seus recursos energéticos.",
        "Com insights claros e objetivos, você pode tomar decisões estratégicas para melhorar a eficiência energética da sua casa ou empresa, gerando impacto positivo no seu orçamento."
    ],
    [
        "Contribua para um futuro mais sustentável! Calculamos suas emissões de carbono com base no consumo e apresenta sugestões práticas para minimizar o impacto ambiental.",
        "Cada mudança recomendada pela plataforma ajuda a preservar recursos naturais e promove práticas sustentáveis no seu dia a dia, fortalecendo sua consciência ambiental."
    ],
    [
        "Fomos projetada para ser prático e fácil de usar. Com uma interface clara, nossos gráficos interativos tornam os dados energéticos acessíveis e compreensíveis para todos.",
        "Mesmo informações complexas são transformadas em insights visuais, permitindo que você entenda e gerencie seu consumo com poucos cliques, sem complicações técnicas."
    ],
    [
        "Podemos prever e planejar o consumo de energia com base em dados confiáveis. Nossa plataforma oferece insights que ajudam a otimizar o uso de recursos e evitar desperdícios.",
        "Tenha uma visão clara do seu consumo histórico e estimativas futuras. Use essas informações para definir metas, criar estratégias e alcançar maior eficiência energética no seu dia a dia."
    ],
    [
        "Mantenha o controle do seu progresso com o monitoramento contínuo. Veja o impacto das ações realizadas e acompanhe melhorias no consumo.",
        "Receba notificações automáticas sobre consumo fora do padrão ou novas oportunidades de economia, garantindo que você nunca perca de vista seus objetivos energéticos."
    ]
];

    return (
        <div className="bg-black text-white p-10 min-h-screen flex flex-col justify-center ">
        <div className="max-w-[113rem] mx-auto">
        <h1 className="text-3xl font-semibold text-purple-400 mb-8 text-center"> Vantagens que Transformam seu Consumo Energético </h1>
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 w-full mt-20">
            {paragrafos.map((paragrafo, index) => (
            <div
                key={index}
                className="bg-[#0a0a0a] border border-[#292929] w-full md:flex-1 lg:flex-1 p-16 flex flex-col items-center rounded-lg"
            >
                <h2 className="text-lg font-semibold mb-4">{titulos[index]}</h2>
                {paragrafo.map((texto, i) => (
                <p key={i} className="text-center text-sm mb-4">{texto}</p>
                ))}
                {index === 2 && (
                <div className="text-purple-400 text-3xl">
                    <span>&#9889;</span>
                </div>
                )}
            </div>
            ))}
        </div>
        <div className="flex justify-center mt-16">
            <FaAngleDoubleDown className="text-6xl animate-bounce" />
        </div>
        </div>
        </div>
    );
};

export default LongsCards;