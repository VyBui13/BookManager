const Bill = require('../schema/Bill');
const Customer = require('../schema/Customer');
const Payment = require('../schema/Payment');
class PaymentService {
    async addPayment({ billID, paymentFee, userID }) {
        try {

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

module.exports = new PaymentService;