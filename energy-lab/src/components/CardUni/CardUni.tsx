import Image from 'next/image';

const CardUni = () => {
return (
    <div className="flex flex-col items-center justify-center bg-black">
    <div className="relative bg-gradient-header w-full max-w-4xl p-24 rounded-xl text-center text-white">

        <div className="absolute -top-12 left-8">
        <Image
            src="/img/icons.png" 
            alt="Ícones"
            width={200}
            height={100}
        />
        </div>
        

        <p className="text-lg" style={{ marginTop: '4.5rem' }}>
        A transição energética é o processo de substituição de fontes de energia convencionais, como combustíveis fósseis, por fontes renováveis e mais limpas, como solar e eólica, promovendo uma mudança na matriz energética global para reduzir emissões e dependência de recursos finitos. Já a eficiência energética está focada em otimizar o uso da energia disponível, garantindo o mesmo desempenho com menor consumo, por meio de tecnologias, equipamentos eficientes e comportamentos conscientes. Enquanto a transição energética visa transformar as fontes de geração, a eficiência energética reduz o consumo e evita desperdícios, sendo ambos complementares na busca por um futuro mais sustentável.
        </p>
    </div>


    <button className="mt-8 w-48 py-2 bg-black border border-white text-white">
        Voltar ao topo
    </button>
    </div>
);
};

export default CardUni;
