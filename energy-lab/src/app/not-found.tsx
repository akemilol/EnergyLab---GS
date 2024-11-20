import Image from "next/image";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 px-4 py-8">
            <h1 className="text-4xl text-purple-500 font-bold mb-4">404 - Página Não Encontrada</h1>
            <div className="flex justify-center mb-6">
                <Image src="/img/erro404.svg" alt="Página de erro." width={500} height={500} className="rounded-lg shadow-lg" />
            </div>
            <p className="text-lg text-gray-300 text-center max-w-md mb-4">
                Oops! Parece que a página que você está procurando não existe. 
            </p>
        </div>
    );
}