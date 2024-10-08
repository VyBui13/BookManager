const express = require('express');
const router = express.Router();

const BooksController = require('../controllers/BookController');

router.get('/', BooksController.getCollection);
router.post('/', BooksController.postColletion);

module.exports = router;