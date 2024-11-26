const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/JWTAction');

const UserController = require('../controllers/UserController');
router.post('/login', UserController.loginAccount);
router.get('/', verifyToken, UserController.authUser);
router.get('/logout', UserController.logoutAccount);
router.get('/amount', UserController.getAmountUser);
router.get('/list', UserController.getListUser);
router.post('/new', UserController.addNewUser);
router.post('/edit', UserController.editUser)

module.exports = router;