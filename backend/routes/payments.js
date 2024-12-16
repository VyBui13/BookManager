const express = require('express');
const router = express.Router();

const CustomerController = require('../controllers/CustomerController');

router.post('/', CustomerController.addPayment);
router.get('/', CustomerController.getPayments);
router.get('/weekly-income', CustomerController.getWeeklyIncome);

module.exports = router;