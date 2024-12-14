const BillService = require('../models/BillService');
const CustomerService = require('../models/CustomerService');
class CustomerController {
    async addBill(req, res) {
        try {
            const billData = req.body;
            const { bookList, customerName, customerPhone, totalPrice, payment, userID } = billData;
            const addCustomerStatus = await CustomerService.addNewCustomer({ customerName, customerPhone });
            console.log(addCustomerStatus);
            if (addCustomerStatus.status === 'error') {
                res.status(400).json(addCustomerStatus);
                return;
            }
            const addBillstatus = await BillService.addBill({ bookList, customerPhone, totalPrice, payment, userID });
            res.status(200).json(addBillstatus);
        }
        catch (err) {
            res.status(500).json({
                status: 'error',
                message: err.message,
            });
        }
    }

    async getBillByCustomer(req, res) {
        try {
            const customerPhone = req.query.customerPhone;
            if (customerPhone) {
                const customer = await BillService.getBillByCustomer(customerPhone);
                res.status(200).json(customer);
            }

        }
        catch (err) {
            res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
    }

    async checkExistCustomer(req, res) {
        try {
            const customerData = req.body;
            const { customerName, customerPhone } = customerData;
            const checkCustomerStatus = await CustomerService.checkExistCustomer({ customerName, customerPhone });
            res.status(200).json(checkCustomerStatus);
        }
        catch (err) {
            res.status(500).json({
                status: 'error',
                message: err.message,
            });
        }
    }
}

module.exports = new CustomerController;