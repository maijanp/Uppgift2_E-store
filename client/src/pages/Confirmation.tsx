import { useEffect, useState } from 'react';


export const Confirmation: React.FC = () => {
    const [verified, setVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
       if (!verified) {
        console.log('Verify-function starting')
        
        const verifySession = async () => {
            let sessionId;
            const dataFromLs = localStorage.getItem("sessionId")

            if (dataFromLs) {
                sessionId = JSON.parse(dataFromLs)
            }

            const response = await fetch("http://localhost:3000/payment/verify-and-create-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({sessionId})
            })

            const data = await response.json()

            if (response.ok) {
                setVerified(data.verified)
                setIsLoading(false)
            }
        }

        verifySession()
       }
    }, [verified]); 

  
       

    return (
        <div>
            <h3>{verified && !isLoading ? "Tack för ditt köp" : "Loading..."}</h3>
        </div>
    );
};
