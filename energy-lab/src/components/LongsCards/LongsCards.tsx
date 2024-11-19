import { FaAngleDoubleDown } from 'react-icons/fa';

const LongsCards = () => {
    const titulos = [
        "Introdução ao Lorem",
        "Introdução ao Lorem",
        "Introdução ao Lorem",
        "Introdução ao Lorem",
        "Introdução ao Lorem"
];

const paragrafos = [
    [
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text for years.",
        "The quick brown fox jumps over the lazy dog. This sentence contains all the letters in the English language."
    ],
    [
        "React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies.",
        "Tailwind CSS is a utility-first CSS framework that can be used to rapidly build modern websites without writing custom CSS."
    ],
    [
        "Next.js is a React framework that enables server-side rendering and static website generation for creating optimized web applications.",
        "JavaScript is a versatile programming language primarily used for web development, both on the client and server sides."
    ],
    [
        "TypeScript extends JavaScript by adding types, enabling developers to write more reliable and maintainable code.",
        "HTML and CSS are foundational technologies for building web pages: HTML for structure and CSS for styling."
    ],
    [
        "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine, allowing developers to use JavaScript for server-side programming.",
        "Git is a distributed version control system that helps developers track changes in their codebase and collaborate with others."
    ]
];

    return (
        <div className="bg-black text-white p-10 min-h-screen flex flex-col justify-center ">
        <div className="max-w-[113rem] mx-auto">
        <h1 className="text-3xl font-semibold text-purple-400 mb-8 text-center">Lorem Ipsum </h1>
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
