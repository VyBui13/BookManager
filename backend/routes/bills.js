const express = require('express');
const router = express.Router();

const CustomerController = require('../controllers/CustomerController');

router.get('/:phone', CustomerController.getBillsByPhone);
router.post('/', CustomerController.addBill);

module.exports = router;