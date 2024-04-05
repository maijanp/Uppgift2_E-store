import { Container, Nav, Navbar } from "react-bootstrap"
import { LogoutButton } from "../logoutButton/LogoutButton"
import { useAuth } from "../../contexts/AuthContext"


export const NavBar = () => {
const {user} = useAuth()
console.log(user)
    return <>
    <Navbar sticky="top" className="bg-body-tertiary" style={{marginBottom:'2rem'}}> 
    <Container>
    <Navbar.Brand href="/">Maija NP - Art</Navbar.Brand>
            <Navbar.Collapse>
            <Navbar.Text>Signed in as: {user} </Navbar.Text>
            </Navbar.Collapse>
            <Nav className="justify-content-end" style={{alignItems: 'center'}}>
                <Nav.Link href="/">Shop</Nav.Link>
                <Nav.Link href="/Cart">Cart</Nav.Link>
                
                {user !== null && <LogoutButton></LogoutButton> }
                {user == null && <a href="/Login"><button>Sign in</button></a>}
            </Nav>
    </Container>
    </Navbar>
    </>
}