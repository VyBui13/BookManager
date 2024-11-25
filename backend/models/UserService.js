const User = require('../schema/User');
const { generateAccessToken } = require('../middleware/JWTAction');
class UserService {
    async getUserByName(userAccount) {
        const user = await User.findOne({
            userName: userAccount
        }) || await User.findOne({ userPhone: userAccount });


        if (!user) {
            return {
                status: 'error',
                message: 'User not found'
            }
        }

        return {
            status: 'success',
            user: user
        };
    }

    async login(user) {
        const { userAccount, userPassword, isGuest } = user;
        if (isGuest) {
            const token = generateAccessToken({ userAccount: "Guest", userRole: 'guest' });
            return {
                status: 'success',
                message: 'Login as guest successfully',
                token: token,
            }
        }
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

    async getAmountUser(role) {
        const query = { $regex: role, $options: 'i' };
        const users = await User.find({ userRole: query });
        return { totalUser: users.length };
    }

}

module.exports = UserService;