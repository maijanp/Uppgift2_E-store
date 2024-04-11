import { useCart } from "../../contexts/CartContext"
import { CartItem } from "../cartItem/CartItem"

export const CartList = () => {
    const { cart } = useCart()
    
    return (
        <div>
            <h3>Your Cart</h3>
            {cart.map((item)=> (
                <CartItem key={item.id} item={item} />
            ))}
        </div>
    )
}