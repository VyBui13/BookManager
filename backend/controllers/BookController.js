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
            const Name = req.body.name;
            const Kind = req.body.kind;
            const Author = req.body.author;
            const Amount = req.body.amount;
            const UpdateDate = req.body.updateDate;

            const query = { Name: Name, Kind: Kind, Author: Author };

            const isBeginMonth = false;
            const book = await Book.findOne(query) // Find book by Name, Kind, Author

            if (book) {
                if (isBeginMonth) {
                    const PresentAmountBook = book.PresentAmount;
                    book.StoredAmount = Number(PresentAmountBook) + Number(Amount);
                    book.PresentAmount = Number(PresentAmountBook) + Number(Amount);
                } else {
                    book.PresentAmount = Number(book.PresentAmount) + Number(Amount);
                }

                book.UpdateDate = UpdateDate;
                book.save();
            } else {
                console.log('Book ascess');
                const newBook = new Book({
                    Name: Name,
                    Kind: Kind,
                    Author: Author,
                    StoredAmount: Amount,
                    PresentAmount: Amount,
                    UpdateDate: UpdateDate,
                    CreatedDate: UpdateDate
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
}

module.exports = new BookController;