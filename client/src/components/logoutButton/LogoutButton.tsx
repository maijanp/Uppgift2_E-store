
import { useAuth } from "../../contexts/AuthContext"

export const LogoutButton = () => {
    const { setUser } = useAuth()

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:3000/auth/logout', {
                method: "POST",
                credentials: "include"
            })

            const data = await response.json()
            if (response.ok) {
                console.log("logout successful")
            } else {
                console.error('Logout failed', data)
            }}

            catch (error) {
                console.error('Network error', error)
            }
        }
        
        return <>
    <button onClick={handleLogout}>Sign out</button>
    </>
    }