import NavBar from "@/components/NavBar/NavBar";
import Header from "@/components/Header/Header";
import Main from "@/components/Main/Main";
import LongsCards from "@/components/LongsCards/LongsCards";
import CardUni from "@/components/CardUnico/CardUnico";
import MenuFaqs from "@/components/MenuFaqs/MenuFaqs";
import Rodape from "@/components/Rodape/Rodape";

export default function Home() {
  return (
    <>
        <NavBar />
        <Header />
        <Main />
        <LongsCards />
        <CardUni />
        <MenuFaqs />
        <Rodape />
    </>
  );
};
