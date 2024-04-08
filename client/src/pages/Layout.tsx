import { Outlet } from "react-router-dom"
import { Footer } from "../components/footer/Footer"
import { NavBar } from "../components/navbar/Navbar"
import { AuthProvider } from "../contexts/AuthContext"
import { CartProvider } from "../contexts/CartContext"

export const Layout = () => {
    return <>
    <AuthProvider>
        <CartProvider>
        <NavBar/>
        <main>
            <Outlet/>
        </main>
        <Footer/>
        </CartProvider>
    </AuthProvider>
    </>
}