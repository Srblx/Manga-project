import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Stack, styled } from "@mui/material";
import { MangaModel } from "../interfaces/MangaModelInterface";
import MangaCard from "../components/MangaCard.component";
import { LoadingDisplayManga } from "../components/LoadingDisplayManga.component";
import { ErrorDisplayManga } from "../components/ErrorDisplayMangaList.component";
import { useInView } from "react-intersection-observer";
import ScrollToTopButton from "../components/navbar/btnScrollTop.component";

const StyledStackForAllCard = styled(Stack)({
  justifyContent: "center",
  margin: "15px",
  padding: "10px 0px",
});

function FetchAndDisplayMangaList() {
  const { ref, inView } = useInView();
  const messageError = "An error occurred while retrieving the mangas.";
  const networkError = "Network response was not ok.";

  const fetchManga = async ({ pageParam }: { pageParam: number }) => {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/manga?page=${pageParam}`
      );
      if (!response.ok) {
        throw new Error(networkError);
      }
      const data = await response.json();
      return data as { data: any, pagination: any };
    } catch (error) {
      throw new Error(messageError);
    }
  };

  const {
    data: dataFromQuery,
    status,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery({
    queryKey: ["manga"],
    queryFn: ({ pageParam }) => fetchManga({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pagination.current_page + 1;
      return nextPage;
    }
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const content = dataFromQuery?.pages.map((page: any, index) =>{
    
  return <StyledStackForAllCard direction="row" spacing={0} flexWrap="wrap" key={index}>
  {(page.data as MangaModel[]).map((manga) =>{

        
  return (
    <div style={{ border: "solid 4px white", margin: "2px", borderRadius: "10px"}} ref={ref} key={manga.mal_id}>
      <MangaCard
        key={manga.mal_id}
        manga={manga}
        price={19.98}
      />
    </div>
  )})}
  </StyledStackForAllCard>}
);

  useEffect(() => {
    if (inView) {
    }
  }, [inView]);

  if (status === "pending") return <LoadingDisplayManga />;
  if (status === "error") return <ErrorDisplayManga error={messageError + error.message} />;

  return (
    <>
      <h1 style={{ marginTop: "4.5rem", color: "white", paddingTop: "1rem" }}>LIST OF MANGAS</h1>
      {content}
      {isFetchingNextPage && <LoadingDisplayManga/>}
      <div style={{ position: "fixed", bottom: "2rem", right: "1rem" }}>
        <ScrollToTopButton />
      </div>
    </>
  );
}

export default FetchAndDisplayMangaList;
