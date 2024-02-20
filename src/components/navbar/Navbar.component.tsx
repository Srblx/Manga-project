import styled from "@emotion/styled";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { useEffect, useState } from "react";
import { DrawerCart } from "../DrawerShoppingCart.component";
// import TextField from "@mui/material/TextField";
// import SearchIcon from "@mui/icons-material/Search";

const StyledDiv = styled("div")({
  background: "#d34040",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  color: "white",
  width: "1.5rem",
  height: "1.5rem",
  position: "absolute",
  bottom: 0,
  right: 0,
  transform: "translate(20%, 30%)",
  fontWeight: "bold",
});

export default function CustomNavbar() {
  const { openCart, cartQuantity } = useShoppingCart();
  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  // const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const handleCloseCart = () => {
    setIsOpen(false);
  };

  // const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setSearchValue(event.target.value);
  //   console.log('event : ', event.target.value);
  // }

  return (
    <Box
      sx={{
        flexGrow: 1,
        position: "fixed",
        width: "100%",
        height: "80px",
        zIndex: "9999",
        transition: "top 0.3s",
        ...(visible ? { top: 0 } : { top: "-80px" }),
      }}
    >
      <AppBar position="static">
        <Toolbar sx={{ background: "#232529" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Home
          </Typography>
          {/* <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              background: "white",
              border: "#2B7BD4",
              borderRadius: "15px",
              marginRight: ".5rem",
              width: "25%",
            }}
          >
            <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="Search a manga by title"
              variant="standard"
              sx={{ width: "100%" }}
              onChange={handleSearchChange}
            />
          </Box> */}
          <Button
            color="inherit"
            sx={{ margin: "10px" }}
            onClick={() => setIsOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              fill="currentColor"
            >
              <path
                d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 
              32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 
              278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 
              512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 
              384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 
              0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 
              176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 
              512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 
              464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 
              416C490.5 416 512 437.5 512 464z"
              />
            </svg>
            <StyledDiv>{cartQuantity}</StyledDiv>
          </Button>
          <DrawerCart
            openCart={isOpen}
            closeCart={handleCloseCart}
            key={Math.random()}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
