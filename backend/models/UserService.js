const User = require('../schema/User');

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
        return {
            status: 'success',
            message: 'Login successfully',
        }
    }
}

module.exports = UserService;