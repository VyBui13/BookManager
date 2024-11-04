const customerService = require('../models/CustomerService');
const customerServiceInstance = new customerService();
class CustomerController {

    async postCustomerBill(req, res) {
        try {
            const billData = req.body;
            const status = await customerServiceInstance.addBill(billData);
            res.status(200).json(status);
        }
        catch (err) {
            res.status(500).json({
                status: 'error',
                message: err.message,
            });
        }
    }

    async postCustomerFee(req, res) {
        try {
            const feeData = req.body;
            const status = await customerServiceInstance.addFee(feeData);
            res.status(200).json(status);
        }
        catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }

    async getCustomer(req, res) {
        try {
            const customerName = req.query.customerName;
            console.log(customerName);
            const customer = await customerServiceInstance.getCustomer(customerName);
            res.status(200).json(customer);
        }
        catch (err) {
            res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
    }
}

module.exports = new CustomerController;