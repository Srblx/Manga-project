import { Routes, Route, BrowserRouter } from "react-router-dom";
import MangaList from "../MangaList";
import SingleManga from "../SingleManga";
import { PageNumberProvider } from "../../context/PageNumberProvider";
import ButtonAppBar from "../../components/Navbar.component";
import { ShoppingCartProvider } from "../../context/ShoppingCartContext";

function Screens() {
  return (
    <BrowserRouter>
    <ShoppingCartProvider>
    <ButtonAppBar/>
      <PageNumberProvider>
        <Routes>
          <Route path="/" element={<MangaList />} />
          <Route path="/:id" element={<SingleManga />} />
        </Routes>
      </PageNumberProvider>
      </ShoppingCartProvider>
    </BrowserRouter>
  );
}
export default Screens;
