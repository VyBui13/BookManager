// const generateAccessToken = require('../middleware/JWTAction');
const userService = require('../models/UserService');
const userServiceInstance = new userService();
class UserController {
    async loginAccount(req, res) {
        const { userAccount, userPassword } = req.body;
        const user = { userAccount, userPassword };
        try {
            const status = await userServiceInstance.login(user);
            if (status.status === 'success') {
                console.log(status.token);
                res.cookie('token', status.token);
            }

            res.json(status);
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

    async authUser(req, res) {
        try {
            return res.status(200).json({
                status: 'success',
                message: 'Authorized',
                name: req.user.userAccount,
            });
        }
        catch (err) {
            res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
    }
}

module.exports = new UserController;