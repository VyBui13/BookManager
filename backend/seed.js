const Book = require('./schema/Book');
const { getCurrentDate, getCurrentTime } = require('./utils/DateUtils');

function seed() {
    const currentDate = getCurrentDate();
    const currentTime = getCurrentTime();

    const books = [
        {
            bookName: "The Great Gatsby",
            bookAuthor: ["F. Scott Fitzgerald"],
            bookKind: ["Fiction", "Classic"],
            bookBeginningAmount: 20,
            bookCurrentAmount: 20,
            bookPrice: 78000,
            updateDate: currentDate,
            updateTime: currentTime,
            beginningDate: currentDate,
            beginningTime: currentTime,
        },
        {
            bookName: "To Kill a Mockingbird",
            bookAuthor: ["Harper Lee"],
            bookKind: ["Fiction", "Drama"],
            bookBeginningAmount: 15,
            bookCurrentAmount: 15,
            bookPrice: 55000,
            updateDate: currentDate,
            updateTime: currentTime,
            beginningDate: currentDate,
            beginningTime: currentTime,
        },
        {
            bookName: "1984",
            bookAuthor: ["George Orwell"],
            bookKind: ["Fiction", "Dystopian"],
            bookBeginningAmount: 30,
            bookCurrentAmount: 30,
            bookPrice: 72000,
            updateDate: currentDate,
            updateTime: currentTime,
            beginningDate: currentDate,
            beginningTime: currentTime,
        },
        {
            bookName: "The Hobbit",
            bookAuthor: ["J.R.R. Tolkien"],
            bookKind: ["Fiction", "Fantasy"],
            bookBeginningAmount: 25,
            bookCurrentAmount: 25,
            bookPrice: 77000,
            updateDate: currentDate,
            updateTime: currentTime,
            beginningDate: currentDate,
            beginningTime: currentTime,
        },
        {
            bookName: "A Brief History of Time",
            bookAuthor: ["Stephen Hawking"],
            bookKind: ["Non-Fiction", "Science"],
            bookBeginningAmount: 10,
            bookCurrentAmount: 10,
            bookPrice: 90000,
            updateDate: currentDate,
            updateTime: currentTime,
            beginningDate: currentDate,
            beginningTime: currentTime,
        },
        {
            bookName: "Pride and Prejudice",
            bookAuthor: ["Jane Austen"],
            bookKind: ["Fiction", "Romance"],
            bookBeginningAmount: 18,
            bookCurrentAmount: 18,
            bookPrice: 65000,
            updateDate: currentDate,
            updateTime: currentTime,
            beginningDate: currentDate,
            beginningTime: currentTime,
        },
        {
            bookName: "The Catcher in the Rye",
            bookAuthor: ["J.D. Salinger"],
            bookKind: ["Fiction", "Classic"],
            bookBeginningAmount: 12,
            bookCurrentAmount: 12,
            bookPrice: 62000,
            updateDate: currentDate,
            updateTime: currentTime,
            beginningDate: currentDate,
            beginningTime: currentTime,
        },
        {
            bookName: "Sapiens: A Brief History of Humankind",
            bookAuthor: ["Yuval Noah Harari"],
            bookKind: ["Non-Fiction", "History"],
            bookBeginningAmount: 20,
            bookCurrentAmount: 20,
            bookPrice: 85000,
            updateDate: currentDate,
            updateTime: currentTime,
            beginningDate: currentDate,
            beginningTime: currentTime,
        },
        {
            bookName: "The Alchemist",
            bookAuthor: ["Paulo Coelho"],
            bookKind: ["Fiction", "Philosophy"],
            bookBeginningAmount: 22,
            bookCurrentAmount: 22,
            bookPrice: 58000,
            updateDate: currentDate,
            updateTime: currentTime,
            beginningDate: currentDate,
            beginningTime: currentTime,
        },
        {
            bookName: "The Art of War",
            bookAuthor: ["Sun Tzu"],
            bookKind: ["Non-Fiction", "Strategy"],
            bookBeginningAmount: 15,
            bookCurrentAmount: 15,
            bookPrice: 50000,
            updateDate: currentDate,
            updateTime: currentTime,
            beginningDate: currentDate,
            beginningTime: currentTime,
        },
    ];

    books.map(async book => {
        const newBook = new Book(book);
        await newBook.save();
    }
    )

}

module.exports = {
    seed
};