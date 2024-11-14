import NavBar from "@/components/NavBar/NavBar";
import Header from "@/components/Header/Header";
import Main from "@/components/Main/Main";
import LongsCards from "@/components/LongsCards/LongsCards";
import CardUni from "@/components/CardUni/CardUni";
import MenuFaqs from "@/components/MenuFaqs/MenuFaqs";

export default function Home() {
  return (
    <>
        <NavBar />
        <Header />
        <Main />
        <LongsCards />
        <CardUni />
        <MenuFaqs />
    </>
  );
}
