import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useCart } from "../../contexts/CartContext"


export const LogoutButton = () => {
    const { setCart } = useCart()
    const {setUser} = useAuth()
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:3000/auth/logout', {
                method: "POST",
                credentials: "include"
            })

            if (response.ok) {
                setCart([]);
                setUser(null)
                navigate("/")
            } else {
                console.error('Logout failed')
            }}

            catch (error) {
                console.error('Network error', error)
            }
           
        }
        
        return <>
    <button style={{backgroundColor: "#6ae4ff", borderRadius: "8px"}} onClick={handleLogout}>Logga ut</button>
    </>
    }