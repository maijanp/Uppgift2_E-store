
const initStripe = require("../../stripe")
const express = require('express')
const fs = require('fs').promises



const createCheckoutSession = async (req, res) => {
    const stripe = initStripe()
    const {cart, customerEmail} = req.body
    
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: cart.map(item => ({
          price_data: {
            currency: item.default_price.currency,
            product_data: {
              name: item.name,
              images: item.images,
            },
            unit_amount: item.default_price.unit_amount,
          },
          quantity: item.quantity,
        })),
        customer_email: customerEmail,
        mode: 'payment',
        success_url: 'http://localhost:5173/confirmation',
        cancel_url: 'http://localhost:5173/cart',
        allow_promotion_codes: true
      });
      console.log("Retrieved session:", session);
      res.json({ url: session.url, sessionId: session.id })
}

const verifyAndCreateOrder = async (req, res) => {
const stripe = initStripe()
const sessionId = req.body.sessionId
const session = await stripe.checkout.sessions.retrieve(sessionId)



if (session.payment_status === "paid") {
  const lineItems = await stripe.checkout.sessions.listLineItems(sessionId)

  const order = {
    orderNumber: Math.floor(Math.random() * 100000000),
    customerEmail: session.customer_email,
    products: lineItems.data,
    total: session.amount_total,
    date: new Date()
  }

  const orders = JSON.parse(await fs.readFile('./data/orders.json'))
  orders.push(order)
  await fs.writeFile('./data/orders.json', JSON.stringify(orders, null, 4))

  res.status(200).json({verified : true})
}
}

module.exports = {createCheckoutSession, verifyAndCreateOrder}