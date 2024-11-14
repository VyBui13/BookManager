const express = require('express');
const router = express.Router();

const BooksController = require('../controllers/BookController');

router.get('/', BooksController.getCollection);
router.get('/top', BooksController.getTop);
router.get('/kinds', BooksController.getKinds);
router.get('/search', BooksController.search);
router.get('/amount', BooksController.getAmount);
router.post('/', BooksController.postColletion);
router.post('/rule', BooksController.checkRule);
router.post('/price', BooksController.setPrice);

module.exports = router;