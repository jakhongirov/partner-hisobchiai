const express = require("express")
const router = express.Router()

// files
const payment = require('./payment/payment')

router
   .get('/profit/:partner_id/:check_id/:profit', payment.GET)

module.exports = router