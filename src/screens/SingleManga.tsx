import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleMangaModel } from "../interfaces/MangaModelInterface";
import MangaCard from "../components/MangaDetails.component";
import { CircularColor } from "../components/LoadingDisplayManga.component";


function SingleManga() {
  const { id } = useParams<{ id: string }>();
  const [singleManga, setSingleManga] = useState<SingleMangaModel | null>(null);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/manga/${id}`).then((response) => {
      response.json().then((json) => {
        const mangaData = json.data as SingleMangaModel;
        setSingleManga(mangaData);
        // console.log(json);
        // console.log("MangaData", mangaData);
      });
    });

    return () => {
      // console.log("Cleaning");
    };
  }, [id]);

  if (!singleManga) {
    return <CircularColor />;
  }
  // console.log(singleManga.image.jpg.image_url);
  

  return <MangaCard manga={singleManga} />;
}

export default SingleManga;
