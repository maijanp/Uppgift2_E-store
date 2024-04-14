import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";

export const Payment = () => {

  const { cart } = useCart();
  const { user } = useAuth()

  if (!user)  { return <Navigate to="/Login" />}

  const handlePayment = async () => {
    try {
        const response = await fetch(
            "http://localhost:3000/payment/create-checkout-session",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ cart: cart, customerEmail: user.email }) 
            }
        );
        
        if (!response.ok) {
            throw new Error("Something went wrong when creating payment session :(");
        }
        const data = await response.json();
        localStorage.setItem("sessionId", JSON.stringify(data.sessionId));
        if (data.url) {
            window.location.href = data.url;
        } else {
            console.error("No url was returned from server :(");
        }
    } catch (error) {
        console.error("Error handling payment:", error);
    }
};

  return (
      <>
          <button style={{backgroundColor: "#6ae4ff"}} onClick={handlePayment}>Fortsätt till betalning</button>
      </>
  );
};