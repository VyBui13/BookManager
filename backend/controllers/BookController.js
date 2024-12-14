const BookService = require('../models/BookService');
const BookImportFormService = require('../models/BookImportFormService');
class BookController {
    async getAllBooks(req, res) {
        try {
            const status = await BookService.getBookList();
            if (status.status === 'error') {
                return res.status(404).json(status);
            }
            return res.status(200).json(status);
        } catch (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
    }

    async addBooks(req, res) {
        try {
            const { bookList, userID } = req.body;
            const statusBooks = await BookService.addBooks({ bookList });

            if (statusBooks.status === 'error') {
                return res.status(500).json(statusBooks);
            }

            const statusImportForm = await BookImportFormService.addNewBookImportForm({ bookList, userID });
            if (statusImportForm.status === 'error') {
                return res.status(500).json(statusImportForm);
            }

            console.log('Books added successfully');

            return res.status(200).json({
                status: 'success',
                message: 'Books added successfully',
            });

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
            const status = await BookService.setBookPrice(bookData);

            res.status(200).json(status);
        } catch (err) {
            res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
    }

    async getTop(req, res) {
        try {
            const { limit } = req.query;
            const status = await BookService.getTopBook({ limit });

            return res.status(200).json(status);

        } catch (err) {
            res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
    }

    async getKinds(req, res) {
        try {
            const status = await BookService.getBookKinds();
            return res.status(200).json(status);
        }
        catch (err) {
            res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
    }

    async search(req, res) {
        try {
            const { keySearch, bookKind, sort, type } = req.query;

            const book = await BookService.searchBook({ keySearch, bookKind, sort, type });

            res.json(book);
        } catch (err) {
            res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
    }

    async getAmount(req, res) {
        try {
            const status = await BookService.getAmount();
            return res.status(200).json(status);
        } catch (err) {
            res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
    }

    async checkRule(req, res) {
        try {
            const book = req.body;
            const rule = await BookService.checkRule(book);
            res.json(rule);
        } catch (err) {
            res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
    }
}

module.exports = new BookController;