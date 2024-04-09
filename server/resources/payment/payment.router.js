const express = require('express')
const router = express.Router()
const {createCheckoutSession, verifyAndCreateOrder } = require('./payment.controller')
const { authorize } = require('../auth/auth.controller')

router.post('/create-checkout-session', authorize, createCheckoutSession)
router.get('/verify-payment', verifyAndCreateOrder)

module.exports = router