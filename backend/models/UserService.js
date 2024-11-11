const User = require('../schema/User');
const { generateAccessToken } = require('../middleware/JWTAction');
class UserService {
    async login(user) {
        const { userAccount, userPassword } = user;
        const queryName = { userName: userAccount };
        const queryPhone = { userPhone: userAccount };
        const userFind = await User.findOne({ $or: [queryName, queryPhone] });
        if (!userFind) {
            return {
                status: 'error',
                message: 'User not found',
            }
        }
        if (userFind.userPassword !== userPassword) {
            return {
                status: 'error',
                message: 'Wrong password',
            }
        }
        const token = generateAccessToken({ userAccount, userRole: userFind.userRole });
        return {
            status: 'success',
            message: 'Login successfully',
            token: token,
        }
    }

    async getUsersByRole(role) {
        const users = await User.find({ userRole: role });
        return users;
    }

}

module.exports = UserService;