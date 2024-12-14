const Bill = require('../schema/Bill.js');
const Book = require('../schema/Book.js');
const Customer = require('../schema/Customer.js');
class BillService {
    async addBill({ bookList, customerPhone, totalPrice, payment, userID }) {
        try {
            const datenow = new Date();

            bookList.map(async book => {
                const bookQuery = { _id: book._id };
                const bookData = await Book.findOne(bookQuery);
                if (!bookData) {
                    return {
                        status: 'error',
                        message: 'Book not found',
                    }
                }

                bookData.bookCurrentAmount = Number(bookData.bookCurrentAmount) - Number(book.amountBought);
                bookData.bookUpdatedDateTime = datenow;
                await bookData.save();
            });

            const customerID = await Customer.findOne({ customerPhone: customerPhone });

            const newBookListID = bookList.map(book => {
                return {
                    bookID: book._id,
                    amountBought: book.amountBought,
                    bookPrice: book.bookPrice,
                }
            })

            const newBill = new Bill({
                customerID: customerID,
                billBookList: newBookListID,
                billTotalPrice: totalPrice,
                billPayment: payment,
                billCreatedUser: userID,
            });

            await newBill.save();
            return {
                status: 'success',
                message: 'Add bill successfully',
            }

        } catch (err) {
            return {
                status: 'error',
                message: err.message,
            }
        }
    }

    async getBillByCustomer(customerPhone) {
        try {

            const query = { customerPhone: customerPhone };
            const customer = await Customer.findOne(query);

            if (!customer) {
                return {
                    status: 'error',
                    message: 'Customer not found',
                }
            }
            const billList = await Bill.find({ customerID: customer._id });
            if (billList.length === 0) {
                return {
                    status: 'error',
                    message: 'Bill not found',
                }
            }

            let newBillList = JSON.parse(JSON.stringify(billList));
            for (let i = 0; i < newBillList.length; i++) {
                const bookList = newBillList[i].billBookList;
                const newBookList = await Promise.all(
                    bookList.map(async book => {
                        const bookQuery = { _id: book.bookID };
                        const bookData = await Book.findOne(bookQuery);
                        return {
                            _id: bookData._id,
                            bookName: bookData.bookName,
                            bookKind: bookData.bookKind,
                            bookAuthor: bookData.bookAuthor,
                            amountBought: book.amountBought,
                            bookPrice: book.bookPrice,
                        };
                    })
                );
                newBillList[i].billBookList = newBookList;
            }
            // const newBillList = await Promise.all(
            //     billList.map(async bill => {
            //         const billBookList = await Promise.all(
            //             bill.billBookList.map(async book => {
            //                 const bookQuery = { _id: book.bookID };
            //                 const bookData = await Book.findOne(bookQuery);
            //                 return {
            //                     _id: bookData._id,
            //                     bookName: bookData.bookName,
            //                     bookKind: bookData.bookKind,
            //                     bookAuthor: bookData.bookAuthor,
            //                     amountBought: book.amountBought,
            //                     bookPrice: book.bookPrice,
            //                 };
            //             })
            //         );
            //         return {
            //             ...bill,
            //             billBookList,
            //         };
            //     })
            // );

            // const bookInBillList = billList.billBookList.map(async book => {
            //     console.log(book)
            //     const bookQuery = { _id: book.bookID };
            //     const bookData = await Book.findOne(bookQuery);
            //     return {
            //         _id: bookData._id,
            //         bookName: bookData.bookName,
            //         bookKind: bookData.bookKind,
            //         bookAuthor: bookData.bookAuthor,
            //         amountBought: book.amountBought,
            //         bookPrice: book.bookPrice,
            //     }
            // });

            return {
                status: 'success',
                message: `Get ${customerPhone}'s successfully`,
                customer: customer,
                billList: newBillList,
            }
        } catch (err) {
            return {
                status: 'error',
                message: err.message,
            }
        }
    }

    // async addFee(feeData) {
    //     try {

    //         const customerName = feeData.customerName;
    //         const customerAddress = feeData.customerAddress;
    //         const customerPhone = feeData.customerPhone;
    //         const customerEmail = feeData.customerEmail;
    //         let payment = feeData.payment;
    //         if (feeData.payment === '') {
    //             payment = 0;
    //         }
    //         const updateDate = feeData.updateDate;

    //         const query = { customerName: customerName };
    //         const customer = await Customer.findOne(query);

    //         if (customer) {
    //             if (payment !== 0) {
    //                 const newFee = {
    //                     payment: payment,
    //                     createdDate: updateDate,
    //                 }
    //                 customer.feeList.push(newFee);
    //                 customer.customerCurrentDebt = Number(customer.customerCurrentDebt) - Number(payment);
    //             }
    //             customer.updateDate = updateDate;
    //             customer.customerAddress = customerAddress;
    //             customer.customerPhone = customerPhone;
    //             customer.customerEmail = customerEmail;

    //             await customer.save();
    //             if (payment !== 0) {
    //                 return {
    //                     status: 'success',
    //                     message: 'Add fee successfully',
    //                 }
    //             } else {
    //                 return {
    //                     status: 'success',
    //                     message: 'Update customer info successfully',
    //                 }
    //             }
    //         } else {
    //             return {
    //                 status: 'error',
    //                 message: 'Customer not found',
    //             }
    //         }
    //     }
    //     catch (err) {
    //         return {
    //             status: 'error',
    //             message: err.message,
    //         }
    //     }
    // }

    // async getCustomerByName(name) {
    //     const query = { customerName: name };
    //     const customer = Customer.findOne(query);
    //     return customer || {};
    // }

    // async getCustomerList() {
    //     return Customer.find();
    // }

    // async getCustomerGeneralDetail() {
    //     const customerList = await Customer.find();
    //     const totalCustomer = customerList.length;
    //     const totalFee = customerList.map(customer => customer.feeList.map(fee => Number(fee.payment)).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0);
    //     return {
    //         totalCustomer: totalCustomer,
    //         totalFee: totalFee,
    //     }
    // }
}

module.exports = new BillService;