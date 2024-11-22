const Book = require('../schema/Book');
const BookImportForm = require('../schema/BookImportForm');
const { getCurrentDate, getCurrentTime } = require('../utils/DateUtils');
class BookService {
    getBookList() {
        return Book.find();
    }

    async addBook(bookData) {
        const currentDate = getCurrentDate();
        const currentTime = getCurrentTime();
        const { bookList, staff } = bookData;
        bookList.map(async (book) => {
            const { bookName, bookKind, bookAuthor, bookAmount } = book;
            const query = { bookName: bookName, bookKind: bookKind, bookAuthor: bookAuthor };
            const theChosenBook = await Book.findOne(query);
            const date = currentDate.split('/')[0];
            let isBeginMonth = false;
            if (date === '01') {
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

                theChosenBook.updateDate = updateDate;
                await theChosenBook.save();
            } else {
                const newBook = new Book({
                    bookName: bookName,
                    bookKind: bookKind,
                    bookAuthor: bookAuthor,
                    bookBeginningAmount: bookAmount,
                    bookCurrentAmount: bookAmount,
                    updateDate: currentDate,
                    updateTime: currentTime,
                    beginnignDate: currentDate,
                    beginningTime: currentTime,
                });
                await newBook.save();
            }
        });

        const newBookForm = new BookImportForm({
            bookList: bookList,
            createDate: currentDate,
            createTime: currentTime,
            staff: staff,
        });

        await newBookForm.save();
        return {
            status: 'success',
            message: 'Book added successfully',
        };
    }

    getTopBook(limit) {
        return Book.find().sort({ bookCurrentAmount: -1 }).limit(limit);
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
            return await Book.find().distinct('bookKind');
        }
        catch (err) {
            console.log(err);
        }
    }

    async searchBook(query) {
        const { keySearch, bookKind, sort, type } = query;
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
        const totalBook = await Book.countDocuments();

        return {
            totalBook: totalBook,
        };
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

module.exports = BookService;