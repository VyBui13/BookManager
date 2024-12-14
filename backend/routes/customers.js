const express = require('express');
const router = express.Router();

const CustomerController = require('../controllers/CustomerController');

router.post('/checking', CustomerController.checkExistCustomer);

module.exports = router;