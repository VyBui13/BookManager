const BookImportForm = require('../schema/BookImportForm');
const Book = require('../schema/Book');

class BookImportFormService {
    async addNewBookImportForm({ bookList, userID }) {
        try {
            const bookListImport = await Promise.all(
                bookList.map(async (book) => {
                    const { bookName, bookKind, bookAuthor, bookAmount } = book;
                    const query = { bookName: bookName, bookKind: bookKind, bookAuthor: bookAuthor };
                    const bookChosen = await Book.findOne(query);
                    return {
                        bookID: bookChosen._id,
                        bookImportAmount: bookAmount,
                    };
                })
            );

            const newBookForm = new BookImportForm({
                bookList: bookListImport,
                importDateTime: new Date(),
                importUser: userID,
            });

            await newBookForm.save();
            return {
                status: 'success',
                message: 'Book import form added successfully',
            };
        } catch (err) {
            return {
                status: 'error',
                message: err.message
            };
        }
    }
}

module.exports = new BookImportFormService;