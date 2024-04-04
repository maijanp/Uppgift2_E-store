const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()

const productsRouter = require("./resources/products/products.router")

app.use(express.json())
app.use(cors())

app.use("/products", productsRouter)

app.listen(3000, () => console.log("Server is running.. 🐧"))