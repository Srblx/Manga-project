import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { IconButton, Stack, styled } from "@mui/material";
import { Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utils/FormatCurrency";
import { Link } from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { MangaModel } from "../interfaces/MangaModelInterface";

export type MangaItemProps = {
  manga: MangaModel;
  price: number;
};

export type ItemProps = {
  mal_id: number;
  title: string;
  imageUrl: string;
  price: number;
};

const StyledMangaCard = styled(Card)({
  height: "450px",
  maxWidth: 345,
  margin: "10px",
  transition: "background-color 0.3s",
});

const StyledMangaCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100%",
});

const StyledButtonAddToCart = styled(Button)({
  textTransform: "capitalize",
  fontWeight: "bold",
});

const StyledSpanPrice = styled("span")({
  fontSize: "18px",
  color: "#2B7BD4",
  marginLeft: "10px",
});

const StyledStackContentBtnReadMore = styled(Stack)({
  width: "100%",
  justifyContent: "flex-end",
  alignItems: "flex-end",
});

const StyledStackForAddToCart = styled(Stack)({
  marginTop: ".2rem",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
});

function MangaCard({ manga, price }: MangaItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFormCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(manga.mal_id);

  const handleAddToCartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    increaseCartQuantity(manga.mal_id);
  };

  return (
    <StyledMangaCard>
      <StyledMangaCardContent className="cardContent">
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineClamp: 1,
            WebkitLineClamp: 1,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
          }}
        >
          {manga.title}
        </Typography>
        <CardMedia
          component="img"
          height="160"
          image={manga.images.jpg.image_url}
          alt=""
        />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineClamp: 6,
            WebkitLineClamp: 6,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
          }}
        >
          {manga.synopsis}
        </Typography>
        <StyledStackContentBtnReadMore>
          <Link
            to={`/${manga.mal_id}`}
            style={{
              color: "green",
              fontWeight: "bold",
              textTransform: "capitalize",
              textDecoration: "none",
              fontSize: ".9rem"
            }}
          >
            Read more ...
          </Link>
        </StyledStackContentBtnReadMore>
        {manga.authors[0] && (
          <Typography sx={{ marginTop: "auto" }}>
            {manga.authors[0].name}
          </Typography>
        )}

        <StyledStackForAddToCart direction="row" spacing={2}>
          {quantity === 0 ? (
            <StyledButtonAddToCart
              // variant="contained":
              onClick={handleAddToCartClick}
              startIcon={<AddShoppingCartIcon />}
              size="small"
              sx={{ textTransform: "capitalize" }}
            >
              Add to cart
            </StyledButtonAddToCart>
          ) : (
            <Stack direction={"row"} spacing={2}>
              <IconButton
                aria-label="remove"
                size="small"
                onClick={() => decreaseCartQuantity(manga.mal_id)}
              >
                <RemoveIcon fontSize="small" style={{ color: "red" }} />
              </IconButton>
              <Stack>
                <p>
                  <span
                    style={{
                      fontSize: "1rem",
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    {quantity}
                  </span>{" "}
                  in cart
                </p>
              </Stack>
              <IconButton
                aria-label="add"
                size="small"
                onClick={() => increaseCartQuantity(manga.mal_id)}
              >
                <AddIcon fontSize="small" style={{ color: "green" }} />
              </IconButton>
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => removeFormCart(manga.mal_id)}
              >
                <DeleteIcon fontSize="small" style={{ color: "red" }} />
              </IconButton>
            </Stack>
          )}

          <StyledSpanPrice>{formatCurrency(price)}</StyledSpanPrice>
        </StyledStackForAddToCart>
      </StyledMangaCardContent>
    </StyledMangaCard>
  );
}
export default MangaCard;
