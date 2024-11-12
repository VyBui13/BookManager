const express = require('express');
const router = express.Router();

const BooksController = require('../controllers/BookController');

router.get('/', BooksController.getCollection);
router.get('/top', BooksController.getTop);
router.get('/kinds', BooksController.getKinds);
router.post('/', BooksController.postColletion);
router.post('/price', BooksController.setPrice);
router.get('/search', BooksController.search);

module.exports = router;