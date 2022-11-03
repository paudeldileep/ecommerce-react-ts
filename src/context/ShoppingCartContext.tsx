import { createContext, useContext, ReactNode, useState } from "react";
import ShoppingCartSidebar from "../components/ShoppingCartSidebar";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface IShoppingCartProviderProps {
  children: ReactNode;
}

interface IShoppingCartContextProps {
  increaseItemQuantity: (itemId: number) => void;
  decreaseItemQuantity: (itemId: number) => void;
  removeItem: (itemId: number) => void;
  getItemQuantity: (itemId: number) => number;
  cartItemQuantity: number;
  cartItems: CartItem[];
  openCart: () => void;
  closeCart: () => void;
  isOpen: boolean;
}

// also type can be used instead of interface
type CartItem = {
  id: number;
  quantity: number;
};

const ShoppingCartContext = createContext({} as IShoppingCartContextProps);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: IShoppingCartProviderProps) {
  //custom hook to store to local storage
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );
  // for cart info on right side
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const cartItemQuantity = cartItems.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  const increaseItemQuantity = (itemId: number) => {
    setCartItems((prevItems) => {
      if (prevItems.find((item) => item.id === itemId) == null) {
        return [...prevItems, { id: itemId, quantity: 1 }];
      } else {
        return prevItems.map((item) => {
          if (item.id === itemId) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  const decreaseItemQuantity = (itemId: number) => {
    setCartItems((prevItems) => {
      if (prevItems.find((item) => item.id === itemId)?.quantity === 1) {
        return prevItems.filter((items) => items.id !== itemId);
      } else {
        return prevItems.map((item) => {
          if (item.id === itemId) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const getItemQuantity = (itemId: number) => {
    return cartItems.find((item) => item.id === itemId)?.quantity || 0;
  };

  const removeItem = (itemId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        isOpen,
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeItem,
        cartItemQuantity,
        cartItems,
        openCart,
        closeCart,
      }}
    >
      {children}
      <ShoppingCartSidebar isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
