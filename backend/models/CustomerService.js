const Customer = require('../schema/Customer.js');

class CustomerService {
    async addBill(billData) {
        const bookList = billData.bookList;
        const customerName = billData.customerName;
        const totalPriceBook = bookList.map(book => Number(book.bookPrice) * Number(book.amountBought)).reduce((a, b) => a + b, 0);
        const updateDate = billData.updateDate;

        const query = { customerName: customerName };

        const isBeginMonth = false;
        const customer = await Customer.findOne(query);

        if (customer) {
            return {
                status: 'success',
                message: 'Add bill successfully',
            }
        } else {
            const newCustomer = new Customer({
                customerName: customerName,
                updateDate: updateDate,
                customerInfoCreatedDate: updateDate,
                customerFirstDebt: 0,
                customerPresentDebt: totalPriceBook,
                billList: [
                    {
                        bookList: bookList.map(book => {
                            return {
                                bookName: book.bookName,
                                bookKind: book.bookKind,
                                bookAuthor: book.bookAuthor,
                                amountBought: book.amountBought,
                                bookPrice: Number(book.bookPrice),
                            }
                        }),
                        createdDate: updateDate,
                        totalPrice: totalPriceBook,
                    }
                ],
                feeList: [
                    {}
                ],
            });
            await newCustomer.save()
            return {
                status: 'success',
                message: 'Add new customer with bill successfully',
            }
        }

    }
}

module.exports = CustomerService;