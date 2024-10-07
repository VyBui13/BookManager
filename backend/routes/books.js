const express = require('express');
const router = express.Router();

const BooksController = require('../controllers/BookController');

router.use('/show', BooksController.show);
router.use('/', BooksController.index);

module.exports = router;