// import { createContext, useContext, useState, useEffect, ReactNode, ChangeEvent } from "react";
// import { MangaModel } from "../interfaces/MangaModelInterface";

// type MangaContextType = {
//   allMangas: MangaModel[];
//   setAllMangas: (mangas: MangaModel[]) => void;
//   searchResults: MangaModel[];
//   setSearchResults: (results: MangaModel[]) => void;
// };

// const MangaContext = createContext<MangaContextType>({
//   allMangas: [],
//   setAllMangas: () => {},
//   searchResults: [],
//   setSearchResults: () => {}
// });

// export const useMangaContext = () => useContext(MangaContext);

// export const MangaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [allMangas, setAllMangas] = useState<MangaModel[]>([]);
//   const [searchTerm, setSearchTerm] = useState<string>(''); 
//   const [searchResults, setSearchResults] = useState<MangaModel[]>([]);

//   const updateSearchResults = (results: MangaModel[]) => {
//     setSearchResults(results);
//   };
// //   console.log('setSearchResultsProvider : ', setSearchResults);

//   useEffect(() => {
//     const fetchMangas = async () => {
//       try {
//         // Construire l'URL de l'API en incluant le terme de recherche
//         const url = `https://api.jikan.moe/v4/manga?q=${encodeURIComponent(searchTerm)}`;
//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error('Erreur lors de la récupération des données des mangas');
//         }
//         const data = await response.json();
        
//         if (data && data.data && Array.isArray(data.data)) {
//           const mangas: MangaModel[] = data.data.map((manga: any) => ({
//             mal_id: manga.id,
//             title: manga.title,
//             images: { jpg: manga.image_url },
//             synopsis: manga.synopsis, 
//             authors: manga.authors, 
//           }));
//           setAllMangas(mangas);
//         } else {
//           console.error('Les données de l\'API ne sont pas au format attendu');
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };
  
//     fetchMangas();
//   }, [searchTerm]); // Effect se déclenche lorsque le terme de recherche change

//   const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value.trim()); // Mettre à jour le terme de recherche avec la valeur de l'input
//   };

//   return (
//     <MangaContext.Provider value={{ allMangas, setAllMangas, searchResults, setSearchResults: updateSearchResults }}>
//       {children}
//     </MangaContext.Provider>
//   );
// };