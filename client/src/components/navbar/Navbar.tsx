import { Container, Nav, Navbar } from "react-bootstrap"
import { LogoutButton } from "../logoutButton/LogoutButton"
import { useAuth } from "../../contexts/AuthContext"
import {  FaShoppingCart } from "react-icons/fa"
import { useCart } from "../../contexts/CartContext"
import styles from './Navbar.module.css'
import {  useLocation, useNavigate } from "react-router-dom"


export const NavBar = () => {
    const { user } = useAuth();
    const { cart } = useCart();
    const navigate = useNavigate()
    const location = useLocation()

    const handleCartClick = () => {
        if (user) {
            navigate("/cart")
        } else { localStorage.setItem('redirectTo', '/cart')
            navigate('/login')
            return null
         }
    }
    return (
        <Navbar sticky="top" className="bg-body-tertiary" style={{ marginBottom: '2rem' }}>
            <Container>
                <Navbar.Brand href="/">Maija NP - Art</Navbar.Brand>
                {user && <p id={styles.user}>Inloggad som: {user.firstName}</p>}
                <Nav className={styles.linksContainer} >
                    {user ? <LogoutButton /> : <Nav.Link href="/Login">Logga in</Nav.Link>}
                    {location.pathname !== '/' && <Nav.Link href="/">Webbshop</Nav.Link>}
                </Nav>
            <div className={styles.cartContainer} onClick={handleCartClick}> 
             <FaShoppingCart className={styles.cartIcon} />
              <span>{cart.length}</span>
        </div>
            </Container>
            
       </Navbar>
    );
};