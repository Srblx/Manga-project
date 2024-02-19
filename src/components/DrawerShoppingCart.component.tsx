import Drawer from "@mui/material/Drawer";
import RemoveIcon from "@mui/icons-material/Remove";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useEffect, useState } from "react";
import { IconButton, Stack, styled } from "@mui/material";
import { formatCurrency } from "../utils/FormatCurrency";
import { MangaModel } from "../interfaces/MangaModelInterface";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import FetchAndDisplayMangaList from "../screens/MangaList";
import { useQuery } from "@tanstack/react-query";

type ShoppingCartProps = {
  openCart: boolean;
  closeCart: () => void;
};

const StyledIconButton = styled(IconButton)({
  alignItems: "flex-start",
  background: "black",
  border: "2px solid white",
  borderRadius: "10px",
  width: "100%",
  "&:hover": {
    background: "rgb(39, 39, 39);",
  },
});

interface CartItemWithQuantity extends MangaModel {
  quantity: number;
}

export function DrawerCart({ openCart, closeCart }: ShoppingCartProps) {
  const {
    cartItemsType,
    removeFormCart,
    increaseCartQuantity,
    decreaseCartQuantity,
    populateManga,
  } = useShoppingCart();
  const price = 19.98;
  const [prevCartItemsLength, setPrevCartItemsLength] = useState<number>(0);
  let total = 0;
  let totalCart = 0;

  // useEffect(() => {
  const fetchCartItemsInfo = async () => {
    try {
      const fetchPromises = cartItemsType.map(async (item) => {
        const response = await fetch(
          `https://api.jikan.moe/v4/manga/${item.id}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data.data as MangaModel;
      });

      const cartItemsInfoResponses = await Promise.all(fetchPromises);
      return cartItemsInfoResponses.filter(Boolean);
    } catch (error) {
      console.error("Error fetching cart items info:", error);
    }
  };

  const { data } = useQuery({
    queryKey: ["mangasItemsCart"],
    queryFn: fetchCartItemsInfo,
    //^ Temps de sauvegarde des date en cache || garbageCollector 
    gcTime: Infinity
  });

  const populatedMangas = data?.map((x) => {
    return {
      id: x.mal_id,
      manga: x,
      quantity: cartItemsType.find((y) => y.id === x.mal_id)?.quantity || 0
    }
  });

  return (
    <Drawer
      anchor={"right"}
      open={openCart && cartItemsType.length > 0}
      onClose={closeCart}
      key={"cartDrawer"}
      sx={{ width: "100%" }}
    >
      <Stack
        spacing={2}
        sx={{
          padding: "1rem",
          background: "rgb(39, 39, 39)",
        }}
      >
        <IconButton
          sx={{
            color: "white",
            background: "red",
            width: "100%",
            borderRadius: "0px 0px 10px 10px",
            padding: "5px 0px 5px 0px",
          }}
          onClick={closeCart}
        >
          <CloseIcon />
        </IconButton>
        <h1 style={{ color: "white" }}>CART</h1>
        {populatedMangas?.map((item) => {
          total = item.quantity * price;
          totalCart = item.quantity * price * populatedMangas.length;
          // console.log((quantity * price ) * cartItemsInfo.length);
          if (!item.manga) return null;
          return (
            <Stack
              direction="row"
              key={item.id}
              spacing={2}
              style={{
                background: " #f4e2e2",
                padding: ".2rem",
                borderRadius: "10px",
              }}
              sx={{ alignItems: "center" }}
            >
              <Stack sx={{ width: "100%" }}>
                <img
                  src={item.manga.images.jpg.image_url}
                  alt={item.manga.title}
                  style={{ width: "180px", height: "auto" }}
                />
              </Stack>
              <Stack
                direction="column"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p>Titre : {item.manga.title}</p>
                <p>Prix: {formatCurrency(price)}</p>
                <StyledIconButton
                  onClick={() => increaseCartQuantity(item.manga?.mal_id!)}
                  sx={{
                    "&:hover": {
                      "& .MuiSvgIcon-root": {
                        color: "green",
                      },
                    },
                  }}
                >
                  <AddIcon sx={{ color: "white" }} />
                </StyledIconButton>
                <p>{item.quantity}</p>
                <StyledIconButton
                  onClick={() => decreaseCartQuantity(item.manga?.mal_id!)}
                  sx={{
                    "&:hover": {
                      "& .MuiSvgIcon-root": {
                        color: "red",
                      },
                    },
                  }}
                >
                  {item.quantity === 1 ? (
                    <DeleteIcon sx={{ color: "red" }} />
                  ) : (
                    <RemoveIcon sx={{ color: "white" }} />
                  )}
                </StyledIconButton>
                <p>Total : {formatCurrency(total)}</p>
              </Stack>
              <IconButton
                style={{
                  height: "100%",
                  background: "red",
                  border: "2px solid red",
                  borderRadius: "0px 10px 10px 0px",
                }}
                onClick={() => removeFormCart(item.manga?.mal_id!)}
              >
                <DeleteIcon sx={{ color: "white" }} />
              </IconButton>
            </Stack>
          );
        })}
      </Stack>
      <Stack sx={{ background: "rgb(39, 39, 39)" }}>
        <p
          style={{
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Total cart : {totalCart.toFixed(2)}
        </p>
      </Stack>
    </Drawer>
  );
  // nav bar cacche scrooll down et display scrool upp / btn scroll up / Not scroll up more quantity 
}
