const express = require('express');
const router = express.Router();

const CustomerController = require('../controllers/CustomerController');

router.post('/', CustomerController.addPayment);

module.exports = router;