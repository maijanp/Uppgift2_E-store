export const Payment = () => {
    const handlePayment = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/stripe/create-checkout-session",
          {
            method: "POST",
          }
        );
        
        if (!response.ok) {
          throw new Error("Something went wrong when creatng payment session :(");
        }
        const data = await response.json();
  
        if (data.url) {
          window.location = data.url;
        } else {
          console.error("No url was returned from server :(");
        }
      } catch (error) {
        console.error("Error handling payment:", error);
      }
    };
  
    return (
      <>
        <button onClick={handlePayment}>Cash eller spö!</button>
      </>
    );
  };
  