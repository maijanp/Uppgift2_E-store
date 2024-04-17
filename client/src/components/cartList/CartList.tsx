import { useCart } from "../../contexts/CartContext";
import { CartItem } from "../cartItem/CartItem";
import { Payment } from "../payment/Payment";
import styles from "./CartList.module.css";

export const CartList = () => {
  const { cart, removeFromCart } = useCart();



  return (
    <div className={styles.cartContainer}>
      <h3>Din varukorg</h3>
      {cart.map((item) => (
        <CartItem key={item.id} item={item} onRemove={() => removeFromCart(item.id)}/>
      ))}
      <Payment/>
    </div>
  );
};
