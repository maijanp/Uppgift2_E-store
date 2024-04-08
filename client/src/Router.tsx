import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { NotFound } from "./pages/NotFound";
import { Home } from "./pages/Home";
import { ProtectedRoute } from "./components/protectedRoute/ProtectedRoute";
import { Cart } from "./pages/Cart";
import { Confirmation } from "./pages/Confirmation";
import { Login } from "./pages/Login";

export const Router = createBrowserRouter([
    {
path: "/",
element: <Layout/>,
errorElement: <NotFound/>,
children: [
    {
        path: "/",
        element: <Home/>
    },
    {path: "/Login",
    element: <Login/>},
    {
        path:"/Cart",
        element: <ProtectedRoute>
            <Cart/>
        </ProtectedRoute>
    },
    {
        path: "/Confirmation",
        element: <ProtectedRoute>
            <Confirmation/>
        </ProtectedRoute>
    }
] 
}])