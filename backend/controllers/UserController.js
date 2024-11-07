// const generateAccessToken = require('../middleware/JWTAction');
const userService = require('../models/UserService');
const userServiceInstance = new userService();
class UserController {
    async loginAccount(req, res) {
        const { userAccount, userPassword } = req.body;
        const user = { userAccount, userPassword };
        try {
            const status = await userServiceInstance.login(user);
            res.status(200).json(status);
        }
        catch (err) {
            res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
    }

    async getUsersByRole(req, res) {
        const role = req.query.role;
        try {
            const users = await userServiceInstance.getUsersByRole(role);
            res.status(200).json(users);
        }
        catch (err) {
            res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
    };
}

module.exports = new UserController;