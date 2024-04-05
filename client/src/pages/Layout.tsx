import { Outlet } from "react-router-dom"
import { Footer } from "../components/footer/Footer"
import { NavBar } from "../components/navbar/Navbar"
import { AuthProvider } from "../contexts/AuthContext"

export const Layout = () => {
    return <>
    <AuthProvider>
        <NavBar/>
        <main>
            <Outlet/>
        </main>
        <Footer/>
    </AuthProvider>
    </>
}