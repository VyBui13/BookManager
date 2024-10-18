
const Customer = require('../models/Customer.js');
class CustomerController {

    async postCustomerBill(req, res) {
        try {
            console.log('ascess');
            const bookList = req.body.bookInfo;
            const CustomerName = req.body.customer;
            const totalPriceBook = bookList.map(book => book.Price * book.Amount).reduce((a, b) => a + b, 0);
            // const NameBook = req.body.nameBook;
            // const KindBook = req.body.kindBook;
            // const AuthorBook = req.body.authorBook;
            // const AmountBook = req.body.amountBook;
            // const PriceBook = req.body.priceBook;
            const UpdateDate = req.body.updateDate;

            // const totalPriceBook = Number(PriceBook) * Number(AmountBook);

            const query = { Name: CustomerName };

            const isBeginMonth = false;
            const customer = await Customer.findOne(query);
            console.log(Customer);

            if (customer) {

            } else {
                const newCustomer = new Customer({
                    Name: CustomerName,
                    UpdateDate: UpdateDate,
                    CreatedDate: UpdateDate,
                    FirstDebt: 0,
                    PresentDebt: totalPriceBook,
                    BillList: [
                        {
                            BookList: bookList,
                            CreatedDate: UpdateDate,
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