import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { IProductCard } from "../models/IProductCard";


interface CartItem extends IProductCard {}

interface ICartContextType {
    cart: CartItem[],
    addToCart: (product: IProductCard) => void
    setCart: (cart: CartItem[]) => void
}

const initialValue = {
    cart: [],
    addToCart: () => {},
    setCart: () => {}
}

const CartContext = createContext<ICartContextType>(initialValue)
export const useCart = () => useContext(CartContext)

interface ICartProviderProps {
    children: ReactNode;
}

export const CartProvider = ({children}: ICartProviderProps) => {
const [cart, setCart] = useState<CartItem[]>(() => {
    const lsData = localStorage.getItem("cart")
    return lsData ? JSON.parse(lsData) : []
})

useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
}, [cart])

const addToCart = (product: IProductCard) => {
    const clonedCart = [...cart]
    const alreadyExists = clonedCart.some(item => item.id === product.id) 

if (alreadyExists) {
    console.log("Cant buy more than 1 of this product")
} else {
    setCart([...clonedCart, product])
}
}

return (<CartContext.Provider value={{cart, addToCart, setCart}}>
{children}
</CartContext.Provider>)
}