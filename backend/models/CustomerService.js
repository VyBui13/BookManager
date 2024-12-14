const Customer = require('../schema/Customer');

class CustomerService {
    async checkExistCustomer({ customerName, customerPhone }) {
        try {
            const theChosenCustomer = await Customer.findOne({ customerPhone: customerPhone });
            if (theChosenCustomer) {
                if (theChosenCustomer.customerName !== customerName) {
                    return {
                        status: 'error',
                        message: 'This phone is existed',
                    }
                }
                return {
                    status: 'success',
                    message: 'Check existence successfully',
                }
            } else {
                return {
                    status: 'success',
                    message: 'Check existence successfully',
                }
            }

        } catch (err) {
            return {
                status: 'error',
                message: err.message,
            }
        }
    }

    async addNewCustomer({ customerName, customerPhone }) {
        try {
            const customer = new Customer({
                customerName: customerName,
                customerPhone: customerPhone,
            });
            await customer.save();
            return {
                status: 'success',
                message: 'Add new customer successfully',
            }
        } catch (err) {
            return {
                status: 'error',
                message: err.message,
            }
        }
    }

    async getAllCustomers() {
        try {
            const customers = await Customer.find();
            return {
                status: 'success',
                message: 'Get all customers successfully',
                data: customers,
            }
        } catch (err) {
            return {
                status: 'error',
                message: err.message,
            }
        }
    }

    async getAmount() {
        try {
            const amount = await Customer.countDocuments();
            return {
                status: 'success',
                message: 'Get amount successfully',
                data: amount,
            }
        } catch (err) {
            return {
                status: 'error',
                message: err.message,
            }
        }
    }

    async updateCustomer({ customer, paymentFee }) {
        try {

            const theChosenCustomer = await Customer.findOne({ _id: customer._id });
            if (!theChosenCustomer) {
                return {
                    status: 'warning',
                    message: 'No customer found',
                };
            }
            theChosenCustomer.customerCurrentDebt = Number(theChosenCustomer.customerCurrentDebt) - Number(paymentFee);
            theChosenCustomer.customerUpdatedDateTime = new Date();
            theChosenCustomer.customerEmail = customer.customerEmail;
            theChosenCustomer.customerAddress = customer.customerAddress;
            theChosenCustomer.customerName = customer.customerName;
            theChosenCustomer.customerPhone = customer.customerPhone;
            await theChosenCustomer.save();


            return {
                status: 'success',
                message: 'Update customer successfully',
            }
        }
        catch (err) {
            return {
                status: 'error',
                message: err.message,
            }
        }
    }
}

module.exports = new CustomerService;