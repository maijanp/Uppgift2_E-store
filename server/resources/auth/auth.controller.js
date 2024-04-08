const fs = require('fs').promises
const bcrypt = require('bcrypt')
const initStripe = require('../../stripe')
const fetchUsers = require("../../utils/fetchUsers")
const stripe = initStripe()

const registerUser = async (req, res) => {

    const {email, password} = req.body
    const users = await fetchUsers()
    const existingUser = users.find(user => user.email === email)
    if (existingUser) {
        return res.status(400).json("User already exists")
    }

    const hashedPassword = await bcrypt.hash(password, 15)

    try {
        const customer = await stripe.customers.create({
            email: email
        })

    const newUser = {
        email,
        password: hashedPassword,
        stripeCustomerId: customer
    }

    users.push(newUser)
    await fs.writeFile("./data/users.json", JSON.stringify(users, null, 2))

    res.status(201).json(newUser.email)
}
catch (error) {
    console.error('Error createing user:', error);
    res.status(500).json({error: "Internal server error creating user"})
}
}

const login = async (req, res) => {
    const {email, password} = req.body
    const users = await fetchUsers()
    const registeredUser = users.find(user => user.email === email)

    if(!registeredUser || !await bcrypt.compare(password, registeredUser.password)) {
        return res.status(400).json({message: "Wrong email or password"})
    }

    req.session.user = registeredUser
    res.status(200).json(registeredUser.email)
}


    const logout = (req, res) => {
        req.session = null
        res.status(200).json("Logout successful")
}


//använd på routes som kräver inloggning
    const authorize = (req, res, next) => {
        if (!req.session.user) {
            return res.status(401).json("You're not logged in")
        } else {
            next()
        }
    }

    const checkLoginStatus = (req, res) => {
        console.log("Check login status called");
        if(req.session.user) {
            res.status(200).json({loggedIn: true, user: req.session.user.email})
        } else {
            res.status(200).json({loggedIn: false})
        }
    }

    module.exports = {registerUser, login, logout, authorize, checkLoginStatus}