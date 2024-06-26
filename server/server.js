const express = require('express')
const cors = require('cors')
require('dotenv').config()
const mongodb = require('mongodb')
const url = "mongodb://localhost:27017";
const client = new mongodb.MongoClient(url)
const cookieSession = require('cookie-session')

const productsRouter = require("./resources/products/products.router")
const authRouter = require("./resources/auth/auth.router")
const paymentRouter = require("./resources/payment/payment.router")

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
app.use("/payment", paymentRouter )


app.listen(3000, () => console.log("Server is running.. 🐧"))