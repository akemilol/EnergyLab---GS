
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
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
        industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
        it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
        typesetting, remaining essentially unchanged.
        </p>
    </div>


    <button className="mt-8 w-48 py-2 bg-black border border-white text-white">
        Voltar ao topo
    </button>
    </div>
);
};

export default CardUni;
