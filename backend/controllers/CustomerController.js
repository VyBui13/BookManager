
const Customer = require('../models/Customer.js');
class CustomerController {

    async postCustomerBill(req, res) {
        try {
            const bookList = req.body.bookList;
            const nameCustomer = req.body.nameCustomer;
            const totalPriceBook = bookList.map(book => book.price * book.amount).reduce((a, b) => a + b, 0);
            const updateDate = req.body.updateDate;

            const query = { _nameCustomer: nameCustomer };

            const isBeginMonth = false;
            const customer = await Customer.findOne(query);

            if (customer) {

            } else {
                const newCustomer = new Customer({
                    _nameCustomer: nameCustomer,
                    _updateDate: updateDate,
                    _customerInfoCreatedDate: updateDate,
                    _customerFirstDebt: 0,
                    _customerPresentDebt: totalPriceBook,
                    _billList: [
                        {
                            _bookList: bookList.map(book => {
                                return {
                                    _nameBook: book.name,
                                    _kindBook: book.kind,
                                    _authorBook: book.author,
                                    _amount: book.amount,
                                    _price: book.price,
                                }
                            }),
                            _createdDate: updateDate,
                            _totalPrice: totalPriceBook,
                        }
                    ],
                    FeeList: [
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