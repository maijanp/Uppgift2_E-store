import { useEffect, useState } from 'react';


export const Confirmation: React.FC = () => {
    const [verified, setVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        verifyPayment();
    }, []); 

    const verifyPayment = async () => {
        let sessionId;
        const dataFromLs = localStorage.getItem('sessionId');

        if (dataFromLs) {
            sessionId = JSON.parse(dataFromLs);
        }

        try {
            const response = await fetch(`http://localhost:3000/payment/verify-payment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId })
            });
            const data = await response.json();
            console.log(data);

            if (data.verified) {
                setVerified(data.verified);
                setIsLoading(false);
            } else {
                console.error('Failed to verify payment:', data.error);
                // Handle error and notify the user
            }
        } catch (error) {
            console.error('Error verifying payment:', error);
            // Handle error and notify the user
        }
    };

    return (
        <div>
            <h3>{verified && !isLoading ? "Tack för ditt köp" : "Loading..."}</h3>
        </div>
    );
};
