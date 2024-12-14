const Book = require('../schema/Book');
const { getDay } = require('../utils/DateUtils');
class BookService {
    async getBookList() {
        try {
            const books = await Book.find();
            if (!books) {
                return {
                    status: 'error',
                    message: 'No book found'
                };
            }

            return {
                status: 'success',
                message: 'Books found',
                data: books,
            };
        }
        catch (err) {
            return {
                status: 'error',
                message: err.message
            };
        }
    }

    async addBooks({ bookList }) {
        try {
            await Promise.all(
                bookList.map(async (book) => {
                    const { bookName, bookKind, bookAuthor, bookAmount } = book;
                    const query = { bookName: bookName, bookKind: bookKind, bookAuthor: bookAuthor };
                    const theChosenBook = await Book.findOne(query);
                    const date = new Date();
                    const currentDay = getDay(date);
                    let isBeginMonth = false;
                    if (currentDay === '01' || currentDay === '1') {
                        isBeginMonth = true;
                    }
                    if (theChosenBook) {
                        if (isBeginMonth) {
                            const currentAmount = theChosenBook.bookCurrentAmount;
                            theChosenBook.bookBeginningAmount = Number(currentAmount) + Number(bookAmount);
                            theChosenBook.bookCurrentAmount = Number(currentAmount) + Number(bookAmount);
                        } else {
                            theChosenBook.bookCurrentAmount = Number(theChosenBook.bookCurrentAmount) + Number(bookAmount);
                        }

                        theChosenBook.bookUpdatedDateTime = date;

                        await theChosenBook.save();
                    } else {
                        const newBook = new Book({
                            bookName: bookName,
                            bookKind: bookKind,
                            bookAuthor: bookAuthor,
                            bookBeginningAmount: bookAmount,
                            bookCurrentAmount: bookAmount,
                            bookPrice: 0,
                            bookUpdatedDateTime: date,
                        });
                        await newBook.save();
                    }
                })
            );

            return {
                status: 'success',
                message: 'Book added successfully',
            };
        } catch (err) {
            return {
                status: 'error',
                message: err.message
            }
        }

    }

    async getTopBook({ limit }) {
        try {
            const books = await Book.find().sort({ bookCurrentAmount: -1 }).limit(limit);
            if (!books) {
                return {
                    status: 'error',
                    message: 'No book found'
                };
            }
            return {
                status: 'success',
                message: 'Books found',
                data: books,
            }
        }
        catch (err) {
            return {
                status: 'error',
                message: err.message
            };
        }
    }

    async setBookPrice(bookData) {
        const query = { bookName: bookData.bookName, bookKind: bookData.bookKind, bookAuthor: bookData.bookAuthor };

        const book = await Book.findOne(query);

        if (book) {
            book.bookPrice = bookData.bookPrice;
            book.save();
            return {
                status: 'success',
                message: bookData.bookName + '\'s price updated successfully'
            };
        } else {
            return {
                status: 'error',
                message: 'Book not found'
            };
        }
    }

    async getBookKinds() {
        try {
            const kinds = await Book.find().distinct('bookKind');
            if (!kinds) {
                return {
                    status: 'error',
                    message: 'No kind found'
                };
            }

            return {
                status: 'success',
                message: 'Kinds found',
                data: kinds,
            };
        }
        catch (err) {
            return {
                status: 'error',
                message: err.message
            };
        }
    }

    async searchBook({ keySearch, bookKind, sort, type }) {
        let bookKindFilter = null;
        let bookNameFilter = null;
        let bookAuthorFilter = null;
        let sortFilter = null;

        if (keySearch) {
            const trimKeySearch = keySearch.trim();
            bookNameFilter = { $regex: trimKeySearch, $options: 'i' };
            bookAuthorFilter = { $regex: trimKeySearch, $options: 'i' };
        }

        if (bookKind) {
            const bookKindArray = bookKind.split(',');
            bookKindFilter = { $in: bookKindArray };
        }

        if (sort) {
            const sortOption = {};
            sortOption[sort] = type === 'asc' ? 1 : -1;
            sortFilter = sortOption;
        }


        let queryConditions = [];
        if (bookNameFilter) queryConditions.push({ bookName: bookNameFilter });
        if (bookAuthorFilter) queryConditions.push({ bookAuthor: bookAuthorFilter });
        if (bookKindFilter) queryConditions.push({ bookKind: bookKindFilter });


        const newBooks = Book.find(queryConditions.length > 0 ? { $and: queryConditions } : {});
        if (sortFilter) {
            newBooks.sort(sortFilter);
        }
        return newBooks;
    }

    async getAmount() {
        try {
            const amount = await Book.find().countDocuments();
            return {
                status: 'success',
                message: 'Amount found',
                data: amount,
            };
        }
        catch (err) {
            return {
                status: 'error',
                message: err.message
            };
        }
    }

    async checkRule(bookData) {
        const { bookName, bookKind, bookAuthor, bookAmount, bookMaxAmountAllow } = bookData;
        const query = { bookName: bookName, bookKind: bookKind, bookAuthor: bookAuthor };

        const book = await Book.findOne(query);

        if (book) {
            if (Number(book.bookCurrentAmount) > Number(bookMaxAmountAllow)) {
                return {
                    status: 'warning',
                    message: 'Only importing book which amount is below ' + bookAmount
                };
            }
            return {
                status: 'success',
                message: 'Book amount is valid'
            };
        }
        return {
            status: 'success',
            message: 'Book amount is valid'
        };

    }
}

module.exports = new BookService;