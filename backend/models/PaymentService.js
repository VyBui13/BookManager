const Bill = require('../schema/Bill');
const Customer = require('../schema/Customer');
const Payment = require('../schema/Payment');

class PaymentService {
    async addPayment({ customer, billID, paymentFee, userID }) {
        try {
            const bill = await Bill.findOne({ _id: billID });
            if (!bill) {
                return {
                    status: 'warning',
                    message: 'No bill found',
                };
            }

            bill.billPayment = Number(bill.billPayment) + Number(paymentFee);
            await bill.save();

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

            if (paymentFee === '') {
                return {
                    status: 'success',
                    message: "Update customer's information successfully",
                };
            }

            const newPayment = new Payment({ billID, paymentFee, paymentCreatedUser: userID });
            await newPayment.save();

            return {
                status: 'success',
                message: 'Add payment successfully',
            }

        } catch (error) {
            return {
                status: 'error',
                message: error.message,
            };
        }
    }
}

module.exports = PaymentService;