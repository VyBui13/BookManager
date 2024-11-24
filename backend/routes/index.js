const bookRouter = require('./books');
const billRouter = require('./bills');
const userRouter = require('./users');

function route(app) {
    app.use('/books', bookRouter);
    app.use('/bills', billRouter);
    app.use('/users', userRouter);
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
}

module.exports = route;