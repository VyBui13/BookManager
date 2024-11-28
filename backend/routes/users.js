const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/JWTAction');

const UserController = require('../controllers/UserController');
router.get('/', verifyToken, UserController.authUser);
router.post('/', UserController.addNewUser);
router.delete('/:id', UserController.deleteUser);
router.put('/:id', UserController.editUserByAdmin); //admin edit

router.post('/login', UserController.loginAccount);
router.get('/logout', UserController.logoutAccount);
router.get('/amount', UserController.getAmountUser);
router.get('/list', UserController.getListUser);
router.post('/edit', UserController.editUser); //self edit

module.exports = router;