const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/JWTAction');

const UserController = require('../controllers/UserController');
router.post('/login', UserController.loginAccount);
router.get('/', verifyToken, UserController.authUser);
router.get('/logout', UserController.logoutAccount);
router.get('/amount', UserController.getAmountUser);

module.exports = router;