import { ReactNode, createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { MangaModel } from "../interfaces/MangaModelInterface";


type ShoppingProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
  manga?: MangaModel;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFormCart: (id: number) => void;
  cartQuantity: number;
  cartItemsType: CartItem[];
  populateManga: (mangas: MangaModel[]) => void;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItem, setCartItem] = useLocalStorage<CartItem[]>(
    "shopping-card",
    []
  );

  const cartQuantity = cartItem.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  function getItemQuantity(id: number) {
    return cartItem.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: number) {
    setCartItem((currentItem) => {
      if (currentItem.find((item) => item.id === id) == null) {
        return [...currentItem, { id, quantity: 1 }];
      } else {
        return currentItem.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id: number) {
    setCartItem((currentItem) => {
      if (currentItem.find((item) => item.id === id)?.quantity == 1) {
        return currentItem.filter((item) => item.id !== id);
      } else {
        return currentItem.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFormCart(id: number) {
    setCartItem((currentItem) => {
      return currentItem.filter((item) => item.id !== id);
    });
  }

  function populateManga(mangas: MangaModel[]) {
    setCartItem((currentItems) => {
      return currentItems.map((item) => {
        return {
          ...item,
          manga: mangas.find((manga) => manga.mal_id === item.id),
        };
      });
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFormCart,
        openCart,
        closeCart,
        cartItemsType: cartItem,
        cartQuantity,
        populateManga,
      }}
    >
      {children}
      {/* <ShoppingCart isOpen={isOpen}/> */}
    </ShoppingCartContext.Provider>
  );
}
