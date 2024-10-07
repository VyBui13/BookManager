const Books = require('../models/Books');


class BookController {
    index(req, res) {
        Books.find()
            .then(books => {
                res.json(books);
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message
                });
            });
    }

    show(req, res) {
        res.send('Show Book');
    }
}

module.exports = new BookController;