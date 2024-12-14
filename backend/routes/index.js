const bookRouter = require('./books');
const billRouter = require('./bills');
const userRouter = require('./users');
const paymentRouter = require('./payments');
const customerRouter = require('./customers');
const ruleRouter = require('./rules');

function route(app) {
    app.use('/books', bookRouter);
    app.use('/bills', billRouter);
    app.use('/users', userRouter);
    app.use('/payments', paymentRouter);
    app.use('/customers', customerRouter);
    app.use('/rules', ruleRouter);
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
}

module.exports = route;