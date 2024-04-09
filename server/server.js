const express = require('express')
const cors = require('cors')
require('dotenv').config()
const cookieSession = require('cookie-session')

const productsRouter = require("./resources/products/products.router")
const authRouter = require("./resources/auth/auth.router")


const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieSession({
    secret: "supersecret",
    maxAge: 1000 * 60 * 30,
}))


app.use("/products", productsRouter)
app.use("/auth", authRouter)


app.listen(3000, () => console.log("Server is running.. 🐧"))