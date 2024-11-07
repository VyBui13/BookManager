const bookRouter = require('./books');
const customerRouter = require('./customers');
const userRouter = require('./users');

function route(app) {
    app.use('/books', bookRouter);
    app.use('/customers', customerRouter);
    app.use('/users', userRouter);
}

module.exports = route;