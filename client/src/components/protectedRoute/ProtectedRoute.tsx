import { Navigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { ReactNode } from "react"


interface IProtectedRouteProps {
    children: ReactNode
}
export const ProtectedRoute = ({children}: IProtectedRouteProps) => {
    const {user} = useAuth() 

    return <>
     {user ? children : <Navigate to = "/" />}
    </>
}