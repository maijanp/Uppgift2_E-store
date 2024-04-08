import { useCart } from "../../contexts/CartContext"


export const LogoutButton = () => {
    const { setCart } = useCart()

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:3000/auth/logout', {
                method: "POST",
                credentials: "include"
            })


            if (response.ok) {
                setCart([]);
                localStorage.removeItem('cart');
                console.log("logout successful")
            } else {
                console.error('Logout failed')
            }}

            catch (error) {
                console.error('Network error', error)
            }
           
        }
        
        return <>
    <button onClick={handleLogout}>Sign out</button>
    </>
    }