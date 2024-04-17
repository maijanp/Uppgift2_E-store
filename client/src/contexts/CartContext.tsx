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
  removeFromCart: (productId: string) => void;
}

const initialValue = {
  cart: [],
  addToCart: () => false,
  setCart: () => {},
  removeFromCart: () => {},
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

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      return prevCart.filter((item) => item.product.id !== productId)
    })
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, setCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
