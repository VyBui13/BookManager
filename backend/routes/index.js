const bookRouter = require('./books');
const billRouter = require('./bills');
const userRouter = require('./users');
const paymentRouter = require('./payments');

function route(app) {
    app.use('/books', bookRouter);
    app.use('/bills', billRouter);
    app.use('/users', userRouter);
    app.use('/payments', paymentRouter);
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
}

module.exports = route;