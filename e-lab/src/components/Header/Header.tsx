export default function Header() {
    return (
    <header
        className="w-full h-[85vh] flex flex-col items-center justify-center text-center text-white bg-gradient-header sm:bg-[url('/img/background.png')] sm:bg-cover">
        <div className="p-6 w-full max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold">Lorem impsum</h1>
        <p className="mb-8 text-2xl">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        </p>

        <button className="bg-violet-700 hover:bg-violet-800 text-white font-semibold py-3 px-6 rounded-[8px] transition duration-300 text-xl">
            Explorar
        </button>
        </div>
        </header>
    );
};