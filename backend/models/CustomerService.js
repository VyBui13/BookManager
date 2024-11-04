const Customer = require('../schema/Customer.js');
const Book = require('../schema/Book.js');

class CustomerService {
    async addBill(billData) {
        const bookList = billData.bookList;
        const customerName = billData.customerName;
        const updateDate = billData.updateDate;
        const totalPriceBook = bookList.map(book => Number(book.bookPrice) * Number(book.amountBought)).reduce((a, b) => a + b, 0);

        const query = { customerName: customerName };

        const isBeginMonth = false;
        const customer = await Customer.findOne(query);

        if (customer) {
            const newBill = {
                bookList: bookList.map(book => {
                    return {
                        bookName: book.bookName,
                        bookKind: book.bookKind,
                        bookAuthor: book.bookAuthor,
                        amountBought: book.amountBought,
                        bookPrice: book.bookPrice,
                    }
                }),
                createdDate: updateDate,
                totalPrice: totalPriceBook,
            }
            customer.billList.push(newBill);
            customer.customerCurrentDebt += totalPriceBook;
            await customer.save();
            return {
                status: 'success',
                message: 'Add bill successfully',
            }
        } else {
            const newCustomer = new Customer({
                customerName: customerName,
                updateDate: updateDate,
                customerInfoCreatedDate: updateDate,
                customerBeginningDebt: 0,
                customerCurrentDebt: totalPriceBook,
                billList: [
                    {
                        bookList: bookList.map(book => {
                            return {
                                bookName: book.bookName,
                                bookKind: book.bookKind,
                                bookAuthor: book.bookAuthor,
                                amountBought: book.amountBought,
                                bookPrice: book.bookPrice,
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

    async addFee(feeData) {
        const customerName = feeData.customerName;
        const customerAddress = feeData.customerAddress;
        const customerPhone = feeData.customerPhone;
        const customerEmail = feeData.customerEmail;
        const payment = feeData.payment;
        if (feeData.payment === '') {
            payment = 0;
        }
        const updateDate = feeData.updateDate;

        const query = { customerName: customerName };
        const customer = await Customer.findOne(query);

        if (customer) {

            if (payment !== 0) {
                const newFee = {
                    payment: payment,
                    createdDate: updateDate,
                }
                customer.feeList.push(newFee);
                customer.customerCurrentDebt = Number(customer.customerCurrentDebt) - Number(payment);
            }
            customer.updateDate = updateDate;
            customer.customerAddress = customerAddress;
            customer.customerPhone = customerPhone;
            customer.customerEmail = customerEmail;

            await customer.save();
            return {
                status: 'success',
                message: 'Add fee successfully',
            }
        } else {
            return {
                status: 'error',
                message: 'Customer not found',
            }
        }
    }

    async getCustomer(name) {
        const query = { customerName: name };
        const customer = Customer.findOne(query);
        return customer || {};
    }


}

module.exports = CustomerService;