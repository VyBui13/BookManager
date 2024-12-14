const express = require('express');
const router = express.Router();

const BookController = require('../controllers/BookController');

router.get('/', BookController.getCollection);
router.get('/top', BookController.getTop);
router.get('/kinds', BookController.getKinds);
router.get('/search', BookController.search);
router.get('/amount', BookController.getAmount);
router.post('/', BookController.postColletion);
router.post('/rule', BookController.checkRule);
router.post('/price', BookController.setPrice);

module.exports = router;