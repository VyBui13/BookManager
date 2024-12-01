const User = require('../schema/User');
const { generateAccessToken } = require('../middleware/JWTAction');
const bcrypt = require('bcrypt');

async function hashPassword(password) {
    try {
        const saltRounds = 1; // Độ mạnh của thuật toán (tốn tài nguyên hơn khi tăng số này)
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (err) {
        console.error("Error hashing password:", err);
        throw err;
    }
}
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

    async getUserById(id) {
        const user = await User.findOne({
            _id: id
        });
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
            const token = generateAccessToken({ userId: "Guest", userRole: 'guest' });
            return {
                status: 'success',
                message: 'Login as guest successfully',
                token: token,
            }
        }
        const queryName = { userName: userAccount.trim() };
        const queryPhone = { userPhone: userAccount.trim() };
        const userFind = await User.findOne({ $or: [queryName, queryPhone] });
        if (!userFind) {
            return {
                status: 'error',
                message: 'User not found',
            }
        }
        if (!bcrypt.compareSync(userPassword, userFind.userPassword)) {
            return {
                status: 'error',
                message: 'Wrong password',
            }
        }
        const token = generateAccessToken({ userId: userFind._id, userRole: userFind.userRole });
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

    async editUserInfo(query) {
        // console.log(query);
        const { type, data, id } = query;
        const userData = await User.findOne({ _id: id });

        if (!userData) {
            return {
                status: 'error',
                message: 'User not found'
            }
        }
        userData[type] = data
        await userData.save();
        return {
            status: 'success',
            message: 'Update user information successfully'
        }
    }

    async getListUser() {
        const users = await User.find();
        return users;
    }

    async addNewUser({ name, phone, email, address, role, dateOfBirth }) {
        try {
            const userFind = await User.findOne({ $and: [{ userName: name }, { userPhone: phone }] });
            if (userFind) {
                return {
                    status: 'error',
                    message: 'User already exists'
                }
            }

            const password = await hashPassword('1');
            const newUser = new User({
                userName: name,
                userPhone: phone,
                userEmail: email,
                userAddress: address,
                userRole: role,
                userDateOfBirth: dateOfBirth || '',
                userPassword: password,
            });

            await newUser.save();

            return {
                status: 'success',
                message: 'Add new user successfully'
            }
        }
        catch (err) {
            return {
                status: 'error',
                message: err.message
            }
        }
    }

    async deleteUser(id) {
        const user = await User.findOne({ _id: id });
        if (!user) {
            return {
                status: 'error',
                message: 'User not found'
            }
        }
        await User.deleteOne({ _id: id });
        return {
            status: 'success',
            message: 'Delete user successfully'
        }
    }

    async editUserByAdmin(query) {
        const { type, data, id } = query;
        const user = await User.findOne({ _id: id });
        const attribute = 'user' + type.slice(0, 1).toUpperCase() + type.slice(1);
        if (!user) {
            return {
                status: 'error',
                message: 'User not found'
            }
        }
        user[attribute] = data;
        await user.save();
        return {
            status: 'success',
            message: `Update ${user.userName}'s ${type} user successfully`,
        };
    }
}
module.exports = UserService;