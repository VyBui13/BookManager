
const Customer = require('../models/Customer.js');
class CustomerController {

    async postCustomerBill(req, res) {
        try {
            console.log('ascess');
            const CustomerName = req.body.customer;
            const NameBook = req.body.nameBook;
            const KindBook = req.body.kindBook;
            const AuthorBook = req.body.authorBook;
            const AmountBook = req.body.amountBook;
            const PriceBook = req.body.priceBook;
            const UpdateDate = req.body.updateDate;

            const totalPriceBook = Number(PriceBook) * Number(AmountBook);

            const query = { Name: CustomerName };

            const isBeginMonth = false;
            const customer = await Customer.findOne(query);
            console.log(Customer);

            if (customer) {

            } else {
                console.log('create new customer');
                const newCustomer = new Customer({
                    Name: CustomerName,
                    UpdateDate: UpdateDate,
                    CreatedDate: UpdateDate,
                    FirstDebt: 0,
                    PresentDebt: totalPriceBook,
                    BillList: [
                        {
                            BookName: NameBook,
                            BookKind: KindBook,
                            BookAuthor: AuthorBook,
                            Amount: AmountBook,
                            Price: PriceBook,
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