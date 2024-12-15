const Book = require('../../schema/Book');
const User = require('../../schema/User');
const Rule = require('../../schema/Rule');
const Customer = require('../../schema/Customer');
const BookImportForm = require('../../schema/BookImportForm');
const Payment = require('../../schema/Payment');
const Bill = require('../../schema/Bill');

async function resetdb() {
    console.log('\x1b[1;31mResetting database...');

    try {
        await Promise.all([
            Book.deleteMany({}),
            User.deleteMany({}),
            Rule.deleteMany({}),
            Customer.deleteMany({}),
            BookImportForm.deleteMany({}),
            Payment.deleteMany({}),
            Bill.deleteMany({})
        ]);
    } finally {
        console.log('\x1b[1;32mDatabase reset');
        console.log('\x1b[1;34m....................................................\x1b[0;0m');
    }
}

module.exports = { resetdb };