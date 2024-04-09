import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IProduct } from "../models/IProduct";

interface CartItem extends IProduct {
  product: IProduct,
  quantity: number,
}

interface ICartContextType {
  cart: CartItem[];
  addToCart: (product: IProduct) => void;
  setCart: (cart: CartItem[]) => void;
}

const initialValue = {
  cart: [],
  addToCart: () => {},
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
    setCart(prevCart => {
      const alreadyExists = prevCart.some(item => item.product.id === product.id);
  
      if (alreadyExists) {
        console.log("Can't buy more than 1 of this product");
        return prevCart; // If it exists, just return the existing cart
      } else {
        // Create a new cart item that includes all product fields, not just the product reference
        const newCartItem: CartItem = {
          ...product, // This spreads all IProduct fields into the new cart item
          product, // This sets the product object
          quantity: 1 // This adds the quantity field
        };
        return [...prevCart, newCartItem]; // Return the updated cart array
      }
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
