const Bill = require('../schema/Bill.js');
const Book = require('../schema/Book.js');
const { getCurrentDate, getCurrentTime } = require('../utils/DateUtils.js');

class BillService {
    // async addBill(billData) {
    //     const bookList = billData.bookList;
    //     const customerName = billData.customerName;
    //     const updateDate = billData.updateDate;
    //     const debtMax = billData.debtMax;
    //     const bookMinAmountAfterSell = billData.bookMinAmountAfterSell;
    //     const totalPriceBook = bookList.map(book => Number(book.bookPrice) * Number(book.amountBought)).reduce((a, b) => a + b, 0);

    //     const query = { customerName: customerName };

    //     const isBeginMonth = false;
    //     const customer = await Customer.findOne(query);

    //     for (let i = 0; i < bookList.length; i++) {
    //         const bookQuery = { bookName: bookList[i].bookName };
    //         const bookData = await Book.findOne(bookQuery);
    //         if (!bookData) {
    //             return {
    //                 status: 'error',
    //                 message: 'Book not found',
    //             }
    //         }
    //         if (Number(bookList[i].amountBought) > Number(bookData.bookCurrentAmount)) {
    //             return {
    //                 status: 'error',
    //                 message: 'Book amount is not enough',
    //             }
    //             if (Number(bookData.bookCurrentAmount) - Number(bookList[i].amountBought) < Number(bookMinAmountAfterSell)) {
    //                 return {
    //                     status: 'warning',
    //                     message: 'Book amount after selling is not below ' + bookMinAmountAfterSell,
    //                 }
    //             }
    //         }
    //         bookList.forEach(async book => {
    //             const bookQuery = { bookName: book.bookName };
    //             const bookData = await Book.findOne(bookQuery);
    //             bookData.bookCurrentAmount = Number(bookData.bookCurrentAmount) - Number(book.amountBought);
    //             bookData.updateDate = updateDate;
    //             await bookData.save();
    //         })

    //         if (customer) {
    //             if (customer.customerCurrentDebt > debtMax) {
    //                 return {
    //                     status: 'warning',
    //                     message: 'Customer debt is over limit',
    //                 }
    //             }

    //             const newBill = {
    //                 bookList: bookList.map(book => {
    //                     return {
    //                         bookName: book.bookName,
    //                         bookKind: book.bookKind,
    //                         bookAuthor: book.bookAuthor,
    //                         amountBought: book.amountBought,
    //                         bookPrice: book.bookPrice,
    //                     }
    //                 }),
    //                 createdDate: updateDate,
    //                 totalPrice: totalPriceBook,
    //             }
    //             customer.billList.push(newBill);
    //             customer.customerCurrentDebt += totalPriceBook;
    //             await customer.save();
    //             return {
    //                 status: 'success',
    //                 message: 'Add bill successfully',
    //             }
    //         } else {
    //             const newCustomer = new Customer({
    //                 customerName: customerName,
    //                 updateDate: updateDate,
    //                 customerInfoCreatedDate: updateDate,
    //                 customerBeginningDebt: 0,
    //                 customerCurrentDebt: totalPriceBook,
    //                 billList: [
    //                     {
    //                         bookList: bookList.map(book => {
    //                             return {
    //                                 bookName: book.bookName,
    //                                 bookKind: book.bookKind,
    //                                 bookAuthor: book.bookAuthor,
    //                                 amountBought: book.amountBought,
    //                                 bookPrice: book.bookPrice,
    //                             }
    //                         }),
    //                         createdDate: updateDate,
    //                         totalPrice: totalPriceBook,
    //                     }
    //                 ],
    //             });
    //             await newCustomer.save()
    //             return {
    //                 status: 'success',
    //                 message: 'Add new customer with bill successfully',
    //             }
    //         }

    //     }
    // }

    async addBill(billData) {
        try {
            console.log(billData);
            const { bookList, customerName, customerPhone, payment, staff } = billData;
            const currentDate = getCurrentDate();
            const currentTime = getCurrentTime();
            const totalPrice = bookList.map(book => Number(book.bookPrice) * Number(book.amountBought)).reduce((a, b) => a + b, 0);

            bookList.map(async book => {
                const bookQuery = { bookName: book.bookName, bookKind: book.bookKind, bookAuthor: book.bookAuthor };
                const bookData = await Book.findOne(bookQuery);
                if (!bookData) {
                    return {
                        status: 'error',
                        message: 'Book not found',
                    }
                }

                bookData.bookCurrentAmount = Number(bookData.bookCurrentAmount) - Number(book.amountBought);
                bookData.updateDate = currentDate;
                await bookData.save();
            })

            const newBill = new Bill({
                customerName: customerName,
                customerPhone: customerPhone,
                bookList: bookList,
                createdDate: currentDate,
                createdTime: currentTime,
                totalPrice: totalPrice,
                payment: payment,
                staff: staff,
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

    async addFee(feeData) {
        try {

            const customerName = feeData.customerName;
            const customerAddress = feeData.customerAddress;
            const customerPhone = feeData.customerPhone;
            const customerEmail = feeData.customerEmail;
            let payment = feeData.payment;
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
                if (payment !== 0) {
                    return {
                        status: 'success',
                        message: 'Add fee successfully',
                    }
                } else {
                    return {
                        status: 'success',
                        message: 'Update customer info successfully',
                    }
                }
            } else {
                return {
                    status: 'error',
                    message: 'Customer not found',
                }
            }
        }
        catch (err) {
            return {
                status: 'error',
                message: err.message,
            }
        }
    }

    async getCustomerByName(name) {
        const query = { customerName: name };
        const customer = Customer.findOne(query);
        return customer || {};
    }

    async getCustomerList() {
        return Customer.find();
    }

    async getCustomerGeneralDetail() {
        const customerList = await Customer.find();
        const totalCustomer = customerList.length;
        const totalFee = customerList.map(customer => customer.feeList.map(fee => Number(fee.payment)).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0);
        return {
            totalCustomer: totalCustomer,
            totalFee: totalFee,
        }
    }
}

module.exports = BillService;