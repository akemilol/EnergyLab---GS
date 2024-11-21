'use client';

import Link from 'next/link';

export default function Header() {
    return (
        <header
            className="w-full h-[70vh] flex flex-col items-center justify-center text-center text-white bg-gradient-header sm:bg-[url('/img/background.png')] sm:bg-cover ">
            <div className="p-6 w-full max-w-2xl">
                <h1 className="mb-8 text-3xl font-bold">EnergyLab</h1>
                <p className="mb-8 text-2xl">
                    A EnergyLab é uma plataforma desenvolvida para simplificar e otimizar a gestão do consumo energético, promovendo eficiência, sustentabilidade e acessibilidade. Projetada para residências, pequenas empresas e indústrias, ela ajuda os usuários a entender, reduzir e monitorar o impacto ambiental do uso de energia.
                </p>

                <Link href="/cadastro">
                    <button className="bg-violet-700 hover:bg-violet-800 text-white font-semibold py-3 px-6 rounded-[8px] transition duration-300 text-xl">
                        Explorar
                    </button>
                </Link>
            </div>
        </header>
    );
}