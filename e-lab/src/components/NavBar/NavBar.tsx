import Link from 'next/link';
import { SlArrowDown } from 'react-icons/sl';

export function NavBar() {
    return (
        <div className="bg-black text-white flex items-center justify-between px-20 py-2">
            <header className="text-4xl font-extrabold pr-4"><h1>EnergyLab</h1></header>
            <nav>
                <ul className="flex space-x-8">
                    <li className="group relative flex items-center space-x-2">
                        <Link href="/" className="text-lg hover:text-yellow-400">Home</Link>
                        <SlArrowDown className="ml-1" />
                    </li>
                    <li className="group relative flex items-center space-x-2">
                        <Link href="/" className="hover:text-yellow-400">FAQs</Link>
                        <SlArrowDown className="ml-1" />
                    </li>
                    <li className="group relative flex items-center space-x-2">
                        <Link href="/" className="hover:text-yellow-400">Sobre Nós</Link>
                        <SlArrowDown className="ml-1" />
                    </li>
                </ul>
            </nav>

            <div className="flex space-x-4">
                <button className="text-xl text-yellow-500 font-bold hover:text-yellow-300">Login</button>
                <button className="bg-yellow-500 text-white font-bold text-xl py-2 px-4 rounded hover:bg-yellow-400">Cadastre-se</button>
            </div>
        </div>
    );
}

export default NavBar;

