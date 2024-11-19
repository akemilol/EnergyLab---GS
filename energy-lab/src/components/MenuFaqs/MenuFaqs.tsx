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
            <h2 className="text-lg font-semibold">Lorem ipsum</h2>
            <p className="text-gray-400 mt-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
            the industry's standard dummy text ever since the 1500s.
            </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-lg font-semibold">Lorem ipsum</h2>
            <p className="text-gray-400 mt-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
            the industry's standard dummy text ever since the 1500s.
            </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-lg font-semibold">Lorem ipsum</h2>
            <p className="text-gray-400 mt-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
            the industry's standard dummy text ever since the 1500s.
            </p>
        </div>
        </div>

    </div>
    </div>
    </div>
);
};

export default MenuFaqs;
