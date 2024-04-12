import { useEffect, useState } from 'react';


export const Confirmation: React.FC = () => {
    const [verified, setVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {


        const verifySession = async () => {
            const dataFromLs = localStorage.getItem("sessionId")

            if (!dataFromLs) {
               console.error("Session ID is missing")
               setIsLoading(false)
               return
            }

            const sessionId = JSON.parse(dataFromLs);
            const response = await fetch("http://localhost:3000/payment/verify-and-create-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({sessionId})
            })

            if (response.ok) {
            const data = await response.json()
                setVerified(data.verified)
                localStorage.removeItem("sessionId")
                localStorage.removeItem("cart")
        } else {
            console.error("Failed to verify the session")
        } 
        setIsLoading(false)

        }

        verifySession()
       
    }, [verified]); 

  
       

    return (
        <div>
            <h3>{verified && !isLoading ? "Tack för ditt köp! 🌞✅" : "Loading..."}</h3>
        </div>
    );
};
