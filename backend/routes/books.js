const express = require('express');
const router = express.Router();

const BooksController = require('../controllers/BookController');

router.get('/', BooksController.getCollection);
router.get('/top', BooksController.getTop);
router.post('/', BooksController.postColletion);
router.post('/setprice', BooksController.setPrice);

module.exports = router;