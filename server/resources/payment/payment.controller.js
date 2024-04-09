
const initStripe = require("../../stripe")
const express = require('express')


const createCheckoutSession = async (req, res) => {
    console.log("Request body:", req.body)
    const stripe = initStripe()
    const {cart} = req.body
    console.log("Cart data:", cart);
    
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
        mode: 'payment',
        success_url: 'http://localhost:5173/confirmation',
        cancel_url: 'http://localhost:5173/cart',
      });
  
      res.json({ url: session.url })
}

module.exports = {createCheckoutSession}