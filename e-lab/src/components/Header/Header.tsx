export default function Header() {
    return (
        <header
            className="relative w-full h-[55vh] flex flex-col items-center justify-start text-center text-white p-8"
            style={{ backgroundImage: "url('img/background.png')", backgroundSize: 'cover', }}
        >
            <div className="p-6 rounded-lg mt-12">
                <h1 className="mb-8 text-3xl max-w-2xl font-bold">Lorem impsum</h1>
                <p className="mb-8 text-2xl max-w-2xl">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                </p>
                
                <button className="bg-violet-700 hover:bg-violet-800 text-white font-semibold py-3 px-6 rounded-[8px] transition duration-300 text-xl">
                    Explorar
                </button>
            </div>
        </header>
    );
}
