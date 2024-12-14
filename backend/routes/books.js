const express = require('express');
const router = express.Router();

const BookController = require('../controllers/BookController');

router.get('/top', BookController.getTop);
router.get('/kinds', BookController.getKinds);
router.get('/search', BookController.search);
router.get('/amount', BookController.getAmount);
router.post('/rule', BookController.checkRule);
router.post('/price', BookController.setPrice);
router.post('/', BookController.addBooks);
router.get('/', BookController.getAllBooks);

module.exports = router;