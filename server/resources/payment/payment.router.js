const express = require('express')
const router = express.Router()
const {createCheckoutSession, verifyAndCreateOrder } = require('./payment.controller')
const { authorize } = require('../auth/auth.controller')

router.post('/create-checkout-session', authorize, createCheckoutSession)
router.post('/verify-and-create-order', authorize, verifyAndCreateOrder)
module.exports = router