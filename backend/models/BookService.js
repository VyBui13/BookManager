const Book = require('../schema/Book');

class BookService {
    getBookList() {
        return Book.find();
    }

    async addBook(bookData) {
        const { bookName, bookKind, bookAuthor, bookAmount, updateDate, regulation } = bookData;
        const query = { bookName: bookName, bookKind: bookKind, bookAuthor: bookAuthor };

        const book = await Book.findOne(query);
        const isBeginMonth = false;

        if (book) {
            if (Number(book.bookCurrentAmount) > Number(regulation)) {
                return {
                    status: 'warning',
                    message: 'Only importing book which amount is below ' + regulation
                };
            }

            if (isBeginMonth) {
                const currentAmount = book.bookCurrentAmount;
                book.bookBeginningAmount = Number(currentAmount) + Number(bookAmount);
                book.bookCurrentAmount = Number(currentAmount) + Number(bookAmount);
            } else {
                book.bookCurrentAmount = Number(book.bookCurrentAmount) + Number(bookAmount);
            }

            book.updateDate = updateDate;
            await book.save();
            return {
                status: 'success',
                message: 'Book updated successfully',
            };
        } else {
            // Create a new book
            const newBook = new Book({
                bookName: bookName,
                bookKind: bookKind,
                bookAuthor: bookAuthor,
                bookBeginningAmount: bookAmount,
                bookCurrentAmount: bookAmount,
                updateDate: updateDate,
                createdDate: updateDate
            });
            await newBook.save();
            return {
                status: 'success',
                message: 'Book added successfully',
            };
        }
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
}

module.exports = BookService;