const bookRouter = require('./books');
const customerRouter = require('./customers');
const userRouter = require('./users');

function route(app) {

    app.use('/books', bookRouter);
    app.use('/customers', customerRouter);
    app.use('/users', userRouter);
    app.use('/', (req, res) => {
        res.send('Hello World');
    });
}

module.exports = route;