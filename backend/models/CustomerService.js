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
}

module.exports = new CustomerService;