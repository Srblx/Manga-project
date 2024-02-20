import { Button } from "@mui/material";
import ArrowUpwardTwoToneIcon from "@mui/icons-material/ArrowUpwardTwoTone";
import { keyframes } from "@emotion/react";

const bounceAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const ScrollToTopButton = () => {
  return (
    <Button
      sx={{
        background: "#2B7BD4",
        border: "3px solid black",
        borderRadius: "15px",
        "&:hover": {
          animation: `${bounceAnimation} 0.5s ease infinite`,
          background: "#78afed",
          border: "3px solid #1100fa",
        },
      }}
      onClick={scrollToTop}
    >
      <ArrowUpwardTwoToneIcon
        sx={{
          color: "white",
          transition: "0.4s all",
          "&:hover": { color: "black" },
        }}
        fontSize="large"
      />
    </Button>
  );
};

export default ScrollToTopButton;
