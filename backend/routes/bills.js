const express = require('express');
const router = express.Router();

const BillController = require('../controllers/BillController');

router.post('/', BillController.addBill);
// router.get('/', BillController.getAllBills);
// router.post('/fee', BillController.postCustomerFee);
// router.get('/generaldetail', BillController.getCustomerGeneralDetail);
// router.get('/', BillController.getCustomer);

module.exports = router;