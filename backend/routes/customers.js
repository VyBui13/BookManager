const express = require('express');
const router = express.Router();

const CustomerController = require('../controllers/CustomerController');

router.post('/checking', CustomerController.checkExistCustomer);
router.get('/amount', CustomerController.getAmount);
router.get('/', CustomerController.getAllCustomers);

module.exports = router;