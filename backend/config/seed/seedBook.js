const Book = require('../../schema/Book');
const { getDate, getTime } = require('../../utils/DateUtils');

async function seedBook() {
    const books = [
        {
            bookName: "The Great Gatsby",
            bookAuthor: ["F. Scott Fitzgerald"],
            bookKind: ["Fiction", "Classic"],
            bookBeginningAmount: 100,
            bookCurrentAmount: 100,
            bookPrice: 78000,
        },
        {
            bookName: "To Kill a Mockingbird",
            bookAuthor: ["Harper Lee"],
            bookKind: ["Fiction", "Drama"],
            bookBeginningAmount: 35,
            bookCurrentAmount: 35,
            bookPrice: 55000,
        },
        {
            bookName: "1984",
            bookAuthor: ["George Orwell"],
            bookKind: ["Fiction", "Dystopian"],
            bookBeginningAmount: 30,
            bookCurrentAmount: 30,
            bookPrice: 72000,
        },
        {
            bookName: "The Hobbit",
            bookAuthor: ["J.R.R. Tolkien"],
            bookKind: ["Fiction", "Fantasy"],
            bookBeginningAmount: 50,
            bookCurrentAmount: 50,
            bookPrice: 77000,
        },
        {
            bookName: "A Brief History of Time",
            bookAuthor: ["Stephen Hawking"],
            bookKind: ["Non-Fiction", "Science"],
            bookBeginningAmount: 70,
            bookCurrentAmount: 70,
            bookPrice: 90000,
        },
        {
            bookName: "Pride and Prejudice",
            bookAuthor: ["Jane Austen"],
            bookKind: ["Fiction", "Romance"],
            bookBeginningAmount: 250,
            bookCurrentAmount: 250,
            bookPrice: 65000,
        },
        {
            bookName: "The Catcher in the Rye",
            bookAuthor: ["J.D. Salinger"],
            bookKind: ["Fiction", "Classic"],
            bookBeginningAmount: 120,
            bookCurrentAmount: 120,
            bookPrice: 62000,
        },
        {
            bookName: "Sapiens: A Brief History of Humankind",
            bookAuthor: ["Yuval Noah Harari"],
            bookKind: ["Non-Fiction", "History"],
            bookBeginningAmount: 80,
            bookCurrentAmount: 80,
            bookPrice: 85000,
        },
        {
            bookName: "The Alchemist",
            bookAuthor: ["Paulo Coelho"],
            bookKind: ["Fiction", "Philosophy"],
            bookBeginningAmount: 85,
            bookCurrentAmount: 85,
            bookPrice: 58000,
        },
        {
            bookName: "The Art of War",
            bookAuthor: ["Sun Tzu"],
            bookKind: ["Non-Fiction", "Strategy"],
            bookBeginningAmount: 75,
            bookCurrentAmount: 75,
            bookPrice: 50000,
        },
    ];

    books.map(async book => {
        const newBook = new Book(book);
        await newBook.save();
    }
    )

}

module.exports = {
    seedBook
};