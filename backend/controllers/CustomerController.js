const BillService = require('../models/BillService');
const CustomerService = require('../models/CustomerService');
const PaymentService = require('../models/PaymentService');
class CustomerController {
    async addBill(req, res) {
        try {
            const { bookList, customerName, customerPhone, totalPrice, payment, userID } = req.body;
            const addCustomerStatus = await CustomerService.addCustomer({ customerName, customerPhone, totalPrice });
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

    async getBillsByPhone(req, res) {
        try {
            const { phone } = req.params;
            if (phone) {
                const customer = await BillService.getBillByCustomer({ phone });
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

    async getAllCustomers(req, res) {
        try {
            const customerList = await CustomerService.getAllCustomers();
            res.status(200).json(customerList);
        }
        catch (err) {
            res.status(500).json({
                status: 'error',
                message: err.message,
            });
        }
    }

    async getAmount(req, res) {
        try {
            const amount = await CustomerService.getAmount();
            res.status(200).json(amount);
        }
        catch (err) {
            res.status(500).json({
                status: 'error',
                message: err.message,
            });
        }
    }

    async addPayment(req, res) {
        try {
            const { customer, billID, paymentFee, userID } = req.body;

            const billUpdateStatus = await BillService.updateBill({ billID, paymentFee });
            if (billUpdateStatus.status === 'error') {
                return res.status(400).json(billUpdateStatus);
            }

            const customerUpdateStatus = await CustomerService.updateCustomer({ customer, paymentFee });
            if (customerUpdateStatus.status === 'error') {
                return res.status(400).json(customerUpdateStatus);
            }
            if (paymentFee === '') {
                return res.status(200).json({
                    status: 'success',
                    message: "Update customer's information successfully",
                });
            }

            const paymentStatus = await PaymentService.addPayment({ billID, paymentFee, userID });
            // Trả về dữ liệu
            return res.status(200).json(paymentStatus);
        } catch (error) {
            return {
                status: 'error',
                message: error.message,
            }
        }
    }

    async getPayments(req, res) {
        try {
            const payments = await PaymentService.getPayments();
            res.status(200).json(payments);
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message,
            });
        }
    }

    async getWeeklyIncome(req, res) {
        try {
            const weeklyIncome = await PaymentService.getWeeklyIncome();
            res.status(200).json(weeklyIncome);
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message,
            });
        }
    }
}

module.exports = new CustomerController;