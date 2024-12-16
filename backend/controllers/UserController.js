// const generateAccessToken = require('../middleware/JWTAction');
const userService = require('../models/UserService');
const userServiceInstance = new userService();
class UserController {
    async loginAccount(req, res) {
        const { userAccount, userPassword, isGuest } = req.body;
        const user = { userAccount, userPassword, isGuest };
        try {
            const status = await userServiceInstance.login(user);
            if (status.status === 'success') {
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
            const role = req.user.userRole.toLowerCase();
            let authorization = {
                home: false,
                importbook: false,
                createbill: false,
                createpayment: false,
                setprice: false,
                reviewbook: true,
                reviewreport: false,
                setting: false,
            }
            if (role == "admin") {
                authorization = {
                    ...authorization,
                    home: true,
                    importbook: true,
                    createbill: true,
                    createpayment: true,
                    setprice: true,
                    reviewreport: true,
                    setting: true,
                }
            } else if (role == "manager") {
                authorization = {
                    ...authorization,
                    home: true,
                    importbook: true,
                    createbill: true,
                    createpayment: true,
                    setprice: true,
                    reviewreport: true,
                }
            }
            else if (role == "staff") {
                authorization = {
                    ...authorization,
                    home: true,
                    createbill: true,
                    createpayment: true,
                }
            }

            const userInfo = await userServiceInstance.getUserById(req.user.userId);
            return res.status(200).json({
                status: 'success',
                message: 'Authorized',
                user: userInfo.user,
                authorization: authorization,
            });
        }
        catch (err) {
            res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
    }

    async logoutAccount(req, res) {
        res.clearCookie('token');
        return res.json({
            status: 'success',
            message: 'Logout successfully'
        })
    }

    async getAmountUser(req, res) {
        let role = null;
        if (req.query.role) {
            role = req.query.role
        }
        try {
            const amount = await userServiceInstance.getAmountUser({ role });
            res.status(200).json(amount);
        }
        catch (err) {
            res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
    }

    async editUser(req, res) {
        try {
            const { type, data } = req.query;
            const id = req.body.id;
            const query = { type, data, id };
            console.log(query)
            const status = await userServiceInstance.editUserInfo(query);
            return res.status(200).json(status);
        }
        catch (err) {
            res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
    }

    async getListUser(req, res) {
        try {
            const users = await userServiceInstance.getListUser();
            return res.status(200).json(users);
        }
        catch (err) {
            res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
    }

    async addNewUser(req, res) {
        const { name, phone, email, address, role, dateOfBirth } = req.body;
        console.log(req.body);
        try {
            const status = await userServiceInstance.addNewUser({ name, phone, email, address, role, dateOfBirth });
            return res.status(200).json(status);
        }
        catch (err) {
            res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
    }

    async deleteUser(req, res) {
        const id = req.params.id;
        try {
            const status = await userServiceInstance.deleteUser(id);
            return res.status(200).json(status);
        }
        catch (err) {
            res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
    }

    async editUserByAdmin(req, res) {
        const { type, data } = req.body;
        const id = req.params.id;
        const query = { type, data, id };
        try {
            const status = await userServiceInstance.editUserByAdmin(query);
            return res.status(200).json(status);
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