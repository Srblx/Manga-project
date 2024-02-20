import { Box, CircularProgress, Stack, styled } from "@mui/material";


const StyledCustomStackForLoading = styled(Stack)({
  background: "#232529",
  padding: "15px",
  border: "4px solid white",
  borderRadius: "10px",
});

const StyledCustomStackForCircular = styled(Stack)({
  alignItems: "center",
  justifyContent: "center",
  padding: "2.5rem 0px"
});

export function CircularColor() {
  return (
    <StyledCustomStackForCircular
      alignItems={"center"}
      justifyContent={"center"}
    >

      <CircularProgress color="success" />
    </StyledCustomStackForCircular>
  );
}

export function LoadingDisplayManga() {
  return (
    <Box sx={{ padding: "10px 30px", marginTop: "85px" }}>
      <StyledCustomStackForLoading>
        <CircularColor />
      </StyledCustomStackForLoading>
    </Box>
  );
}

