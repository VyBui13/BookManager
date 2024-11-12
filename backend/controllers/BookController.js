const bookService = require('../models/BookService');
const bookServiceInstance = new bookService();

class BookController {
    getCollection(req, res) {
        bookServiceInstance.getBookList()
            .then(book => {
                res.json(book);
            })
            .catch(err => {
                res.status(500).json({
                    status: 'error',
                    message: err.message
                });
            });
    }

    async postColletion(req, res) {
        try {
            const { bookName, bookKind, bookAuthor, bookAmount, updateDate, regulation } = req.body;
            const bookData = { bookName, bookKind, bookAuthor, bookAmount, updateDate, regulation };

            const status = await bookServiceInstance.addBook(bookData);

            res.status(200).json(status);
        } catch (err) {
            res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
    }

    async setPrice(req, res) {
        try {
            const bookData = req.body;
            const status = await bookServiceInstance.setBookPrice(bookData);

            res.status(200).json(status);
        } catch (err) {
            res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
    }

    getTop(req, res) {
        bookServiceInstance.getTopBook(req.query.limit)
            .then(book => {
                res.json(book);
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message
                });
            });
    }

    getKinds(req, res) {
        bookServiceInstance.getBookKinds()
            .then(kind => {
                res.json(kind);
            })
            .catch(err => {
                res.status(500).json({
                    status: 'error',
                    message: err.message
                });
            });
    }

    async search(req, res) {
        try {
            const { keySearch, bookKind, sort, type } = req.query;
            const bookData = { keySearch, bookKind, sort, type };

            const book = await bookServiceInstance.searchBook(bookData);

            res.json(book);
        } catch (err) {
            res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
    }
}

module.exports = new BookController;