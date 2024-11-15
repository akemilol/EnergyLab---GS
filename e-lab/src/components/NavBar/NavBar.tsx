'use client'

import { useState } from 'react';
import Link from 'next/link';
import { FaChevronDown } from 'react-icons/fa';
import { SlEnergy } from "react-icons/sl";
import { FiMenu, FiX } from 'react-icons/fi';
import { FiBox, FiHelpCircle, FiUsers } from 'react-icons/fi';

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    function toggleMenu() {
        setMenuOpen(!menuOpen);
    }

    return (
        <header className="bg-zinc-800 text-violet-500 flex flex-wrap items-center justify-between px-6 py-4 max-w-[113rem] mx-auto">
            <div className="flex items-center justify-between w-full md:w-auto">
                <div className="flex items-center text-4xl font-extrabold">
                    <h1>EnergyLab</h1>
                    <SlEnergy className="ml-2" />
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMenu}>
                        {menuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
                    </button>
                </div>
            </div>

            <nav className={`w-full md:flex md:items-center md:w-auto ${menuOpen ? 'block' : 'hidden'}`}>
                <ul className={` text-white flex flex-col items-center md:flex-row md:space-x-8 space-y-4 md:space-y-0 mt-4 md:mt-0 ${menuOpen ? 'text-center' : ''}`}>
                    <li className="group relative flex items-center space-x-2">
                        <Link href="/" className="text-lg hover:text-violet-400">Home</Link>
                        {menuOpen ? <FiBox /> : <FaChevronDown />}
                    </li>
                    <li className="group relative flex items-center space-x-2">
                        <Link href="/" className="text-lg hover:text-violet-400">FAQs</Link>
                        {menuOpen ? <FiHelpCircle /> : <FaChevronDown />}
                    </li>
                    <li className="group relative flex items-center space-x-2">
                        <Link href="/sobrenos" className="text-lg hover:text-violet-400">Sobre Nós</Link>
                        {menuOpen ? <FiUsers /> : <FaChevronDown />}
                    </li>
                </ul>
            </nav>

            <div className={`w-full md:flex md:items-center md:w-auto ${menuOpen ? 'block text-center' : 'hidden'} md:block mt-4 md:mt-0`}>                
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                    <button className="text-xl text-violet-500 font-bold hover:text-violet-400">Login</button>
                    <button className="bg-violet-500 text-white font-bold text-xl py-2 px-4 rounded hover:bg-violet-700">Cadastre-se</button>
                </div>
            </div>
        </header>
    );
}

