const express = require('express')
const router = express.Router()
const {createCheckoutSession, verifyAndCreateOrder } = require('./payment.controller')

router.post('/create-checkout-session', createCheckoutSession)
router.post('/verify-and-create-order', verifyAndCreateOrder)
module.exports = router