
const Customer = require('../models/Customer.js');
class CustomerController {

    async postCustomerBill(req, res) {
        try {
            const bookList = req.body.bookList;
            const customerName = req.body.customerName;
            const totalPriceBook = bookList.map(book => Number(book._bookPrice) * Number(book._amountBought)).reduce((a, b) => a + b, 0);
            const updateDate = req.body.updateDate;

            const query = { _customerName: customerName };

            const isBeginMonth = false;
            const customer = await Customer.findOne(query);
            console.log(customer);

            if (customer) {

            } else {
                const newCustomer = new Customer({
                    _customerName: customerName,
                    _updateDate: updateDate,
                    _customerInfoCreatedDate: updateDate,
                    _customerFirstDebt: 0,
                    _customerPresentDebt: totalPriceBook,
                    _billList: [
                        {
                            _bookList: bookList.map(book => {
                                return {
                                    _bookName: book._bookName,
                                    _bookKind: book._bookKind,
                                    _bookAuthor: book._bookAuthor,
                                    _amount: book._amountBought,
                                    _price: Number(book._bookPrice),
                                }
                            }),
                            _createdDate: updateDate,
                            _totalPrice: totalPriceBook,
                        }
                    ],
                    _feeList: [
                        {}
                    ],
                });
                await newCustomer.save()
            }

        }
        catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }

    async postCustomerFee(req, res) {
        try {

        }
        catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }
}

module.exports = new CustomerController;