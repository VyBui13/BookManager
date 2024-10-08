const Books = require('../models/Books');


class BookController {
    getCollection(req, res) {
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

    async postColletion(req, res) {
        try {

            const Name = req.body.name;
            const Kind = req.body.kind;
            const Author = req.body.author;
            const Amount = req.body.amount;
            const UpdateDate = req.body.updateDate;
            const query = { Name: Name, Kind: Kind, Author: Author };

            const isBeginMonth = false;
            const Book = await Books.findOne(query)

            if (Book) {
                if (isBeginMonth) {
                    const PresentAmountBook = Book.PresentAmount;
                    Book.StoredAmount = Number(PresentAmountBook) + Number(Amount);
                    Book.PresentAmount = Number(PresentAmountBook) + Number(Amount);
                } else {
                    Book.PresentAmount = Number(Book.PresentAmount) + Number(Amount);
                }

                Book.UpdateDate = UpdateDate;
                Book.save();
                console.log('Book updated');
            } else {
                const newBook = new Books({
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