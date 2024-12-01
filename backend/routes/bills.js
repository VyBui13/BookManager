const express = require('express');
const router = express.Router();

const BillController = require('../controllers/BillController');

router.get('/', BillController.getBillByCustomer);
router.post('/', BillController.addBill);

module.exports = router;