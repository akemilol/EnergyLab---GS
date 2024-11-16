import NavBar from "@/components/NavBar/NavBar";
import CardAbout from "@/components/CardAbout/CardAbout"
import FigmaBotão from "@/components/FigmaBotao/FigmaBotao";

export default function Sobrenos() {
    return (
        <div>
        <NavBar />

        <h1 className="text-center text-white text-2xl mx-auto max-w-3xl mt-10">
        Somos uma equipe que otimiza a gestão de redes de energia renovável, unindo inovação e sustentabilidade para maximizar a eficiência energética e promover o uso consciente dos recursos.
        </h1>
        
        <CardAbout />

        <FigmaBotão />
        </div>
    );
};