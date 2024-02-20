import { ChangeEvent, useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Box, Stack, TextField, styled } from "@mui/material";
import { MangaModel } from "../interfaces/MangaModelInterface";
import MangaCard from "../components/MangaCard.component";
import { LoadingDisplayManga } from "../components/LoadingDisplayManga.component";
import { ErrorDisplayManga } from "../components/ErrorDisplayMangaList.component";
import { useInView } from "react-intersection-observer";
import ScrollToTopButton from "../components/navbar/btnScrollTop.component";
import SearchIcon from "@mui/icons-material/Search";

const StyledStackForAllCard = styled(Stack)({
  justifyContent: "center",
  margin: "15px",
  padding: "10px 0px",
});

function FetchAndDisplayMangaList() {
  const { ref, inView } = useInView();
  const messageError = "An error occurred while retrieving the mangas.";
  const networkError = "Network response was not ok.";
  const [searchValue, setSearchValue] = useState("");
  const queryKey = searchValue ? ["manga", searchValue] : ["manga"];

  const fetchManga = async ({ pageParam }: { pageParam: number }) => {
    try {
      let apiUrl = "";
      if (searchValue) {
        apiUrl = `https://api.jikan.moe/v4/manga?q=${searchValue}`;
      } else {
        apiUrl = `https://api.jikan.moe/v4/manga?page=${pageParam}`;
      }
      console.log('apiUrl : ', apiUrl);
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(networkError);
      }
      const data = await response.json();
      return data as { data: any; pagination: any };
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
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: ({ pageParam }) => fetchManga({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pagination.current_page + 1;
      return nextPage;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    console.log("event : ", event.target.value);
  };

  const content = dataFromQuery?.pages.map((page: any, index) => {
    return (
      <StyledStackForAllCard
        direction="row"
        spacing={0}
        flexWrap="wrap"
        key={index}
      >
        {(page.data as MangaModel[]).map((manga) => {
          return (
            <div
              style={{
                border: "solid 4px white",
                margin: "2px",
                borderRadius: "10px",
              }}
              ref={ref}
              key={manga.mal_id}
            >
              <MangaCard key={manga.mal_id} manga={manga} price={19.98} />
            </div>
          );
        })}
      </StyledStackForAllCard>
    );
  });

  useEffect(() => {
    if (inView) {
    }
  }, [inView]);

  if (status === "pending") return <LoadingDisplayManga />;
  if (status === "error")
    return <ErrorDisplayManga error={messageError + error.message} />;

  return (
    <>
      <h1 style={{ marginTop: "4.5rem", color: "white", paddingTop: "1rem" }}>
        LIST OF MANGAS
      </h1>
      <Stack
        sx={{
          background: "gray",
          padding: ".5rem",
          width: "50%",
          display: "contents",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "auto",
            alignItems: "center",
            background: "white",
            paddingLeft: ".5rem",
            borderRadius: "15px",
            width: "50%",
          }}
        >
          <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            label="Search a manga by title"
            variant="outlined"
            sx={{ width: "100%", "& fieldset": { border: "none" } }}
            onChange={handleSearchChange}
          />
        </Box>
      </Stack>
      {content}
      {isFetchingNextPage && <LoadingDisplayManga />}
      <div style={{ position: "fixed", bottom: "2rem", right: "1rem" }}>
        <ScrollToTopButton />
      </div>
    </>
  );
}

export default FetchAndDisplayMangaList;
