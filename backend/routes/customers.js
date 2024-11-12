const express = require('express');
const router = express.Router();

const CustomersController = require('../controllers/CustomerController');

router.post('/bill', CustomersController.postCustomerBill);
router.post('/fee', CustomersController.postCustomerFee);
router.get('/generaldetail', CustomersController.getCustomerGeneralDetail);
router.get('/', CustomersController.getCustomer);

module.exports = router;