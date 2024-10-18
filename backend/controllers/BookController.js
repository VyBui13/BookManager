const Book = require('../models/Book');

class BookController {
    getCollection(req, res) {
        Book.find()
            .then(book => {
                res.json(book);
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message
                });
            });
    }

    async postColletion(req, res) {
        try {
            const bookName = req.body.bookName;
            const bookKind = req.body.bookKind;
            const bookAuthor = req.body.bookAuthor;
            const bookAmount = req.body.bookAmount;
            const updateDate = req.body.updateDate;

            const query = { _bookName: bookName, _bookKind: bookKind, _bookAuthor: bookAuthor };

            const isBeginMonth = false;
            const book = await Book.findOne(query) // Find book by Name, Kind, Author

            if (book) {
                if (isBeginMonth) {
                    const presentAmountBook = book._bookPresentAmount;
                    book._bookStoredAmount = Number(presentAmountBook) + Number(bookAmount);
                    book._bookPresentAmount = Number(presentAmountBook) + Number(bookAmount);
                } else {
                    book._bookPresentAmount = Number(book._bookPresentAmount) + Number(bookAmount);
                }

                book._updateDate = updateDate;
                book.save();
            } else {
                const newBook = new Book({
                    _bookName: bookName,
                    _bookKind: bookKind,
                    _bookAuthor: bookAuthor,
                    _bookStoredAmount: bookAmount,
                    _bookPresentAmount: bookAmount,
                    _updateDate: updateDate,
                    _createdDate: updateDate
                });
                newBook.save()
            }
        }
        catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }

    async setPrice(req, res) {
        try {
            const bookName = req.body._bookName;
            const bookKind = req.body._bookKind;
            const bookAuthor = req.body._bookAuthor;
            const bookPrice = req.body._bookPrice;

            const query = { _bookName: bookName, _bookKind: bookKind, _bookAuthor: bookAuthor };

            const book = await Book.findOne(query);

            if (book) {
                book._bookPrice = bookPrice;
                book.save();
            } else {
                console.log('Book not found');
                res.status(404).json({
                    message: 'Book not found'
                });
            }
        }
        catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }
}

module.exports = new BookController;