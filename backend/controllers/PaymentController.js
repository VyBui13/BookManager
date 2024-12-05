const PaymentService = require('../models/PaymentService');
const paymentServiceInstance = new PaymentService();


class PaymentController {
    async addPayment(req, res) {
        try {
            const { customer, billID, paymentFee, userID } = req.body;
            console.log(req.body);
            const value = await paymentServiceInstance.addPayment({ customer, billID, paymentFee, userID });
            // Trả về dữ liệu
            return res.status(200).json(value);
        } catch (error) {
            return {
                status: 'error',
                message: error.message,
            }
        }
    }
}

module.exports = new PaymentController();