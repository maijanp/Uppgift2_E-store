import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IProduct } from "../models/IProduct";

interface CartItem extends IProduct {
  product: IProduct;
  quantity: number;
}

interface ICartContextType {
  cart: CartItem[];
  addToCart: (product: IProduct) => boolean;
  setCart: (cart: CartItem[]) => void;
}

const initialValue = {
  cart: [],
  addToCart: () => false,
  setCart: () => {},
};

const CartContext = createContext<ICartContextType>(initialValue);
export const useCart = () => useContext(CartContext);

interface ICartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: ICartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const lsData = localStorage.getItem("cart");
    return lsData ? JSON.parse(lsData) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: IProduct) => {
    let isAdded = false
    setCart((prevCart) => {
      const alreadyExists = prevCart.some(
        (item) => item.product.id === product.id
      );

      if (!alreadyExists) {
        const newCartItem: CartItem = {
          ...product,
          product,
          quantity: 1,
        };
        isAdded = true; 
        return [...prevCart, newCartItem];
      }
      return prevCart; 
    });
    return isAdded;
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
