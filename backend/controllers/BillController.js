const billService = require('../models/BillService');
const billServiceInstance = new billService();
class BillController {

    // async postCustomerBill(req, res) {
    //     try {
    //         const billData = req.body;
    //         const status = await billServiceInstance.addBill(billData);
    //         res.status(200).json(status);
    //     }
    //     catch (err) {
    //         res.status(500).json({
    //             status: 'error',
    //             message: err.message,
    //         });
    //     }
    // }

    // async postCustomerFee(req, res) {
    //     try {
    //         const feeData = req.body;
    //         const status = await billServiceInstance.addFee(feeData);
    //         res.status(200).json(status);
    //     }
    //     catch (err) {
    //         res.status(500).json({
    //             message: err.message
    //         });
    //     }
    // }

    // async getCustomer(req, res) {
    //     try {
    //         const customerName = req.query.customerName;
    //         if (customerName) {
    //             const customer = await billServiceInstance.getCustomerByName(customerName);
    //             res.status(200).json(customer);
    //         }
    //         else {
    //             billServiceInstance.getCustomerList()
    //                 .then(customerList => {
    //                     res.json(customerList);
    //                 })
    //                 .catch(err => {
    //                     res.status(500).json({
    //                         status: 'error',
    //                         message: err.message
    //                     });
    //                 });
    //         }
    //     }
    //     catch (err) {
    //         res.status(500).json({
    //             status: 'error',
    //             message: err.message
    //         });
    //     }
    // }

    // async getCustomerGeneralDetail(req, res) {
    //     try {
    //         const detail = await billServiceInstance.getCustomerGeneralDetail();
    //         console.log(detail);
    //         res.status(200).json(detail);
    //     }
    //     catch (err) {
    //         res.status(500).json({
    //             status: 'error',
    //             message: err.message
    //         });
    //     }
    // }

    async addBill(req, res) {
        try {
            const billData = req.body;
            const status = await billServiceInstance.addBill(billData);
            res.status(200).json(status);
        }
        catch (err) {
            res.status(500).json({
                status: 'error',
                message: err.message,
            });
        }
    }
}

module.exports = new BillController;