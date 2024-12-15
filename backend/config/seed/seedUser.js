const User = require('../../schema/User');
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

async function seedUser() {
    const password = await hashPassword('1');

    const users = [
        {
            userName: 'Bui Dinh Gia Bao',
            userPhone: '0923872902',
            userDateOfBirth: '13/07/2013',
            userEmail: 'buibao13@gmail.com',
            userAddress: 'Ho Chi Minh',
            userRole: 'admin',
            userPassword: password,
        },

        {
            userName: 'Phan Thi Thanh Tram',
            userPhone: '0786639566',
            userDateOfBirth: '13/01/2003',
            userEmail: 'pttram13@gmail.com',
            userAddress: 'Ho Chi Minh',
            userRole: 'manager',
            userPassword: password,
        },

        {
            userName: 'Bui Dinh Gia Vy',
            userPhone: '0797347660',
            userDateOfBirth: '09/04/2004',
            userEmail: 'blackzerogamer09@gmail.com',
            userAddress: 'Ho Chi Minh',
            userRole: 'admin',
            userPassword: password,
        },

        {
            userName: 'Nguyen Van A',
            userPhone: '0912345678',
            userDateOfBirth: '15/06/1990',
            userEmail: 'nguyenvana@gmail.com',
            userAddress: 'Hanoi',
            userRole: 'staff',
            userPassword: password,
        },
        {
            userName: 'Tran Thi B',
            userPhone: '0938765432',
            userDateOfBirth: '22/11/1985',
            userEmail: 'tranthib@gmail.com',
            userAddress: 'Da Nang',
            userRole: 'staff',
            userPassword: password,
        },
        {
            userName: 'Le Hoang C',
            userPhone: '0987654321',
            userDateOfBirth: '05/03/1995',
            userEmail: 'lehoangc@gmail.com',
            userAddress: 'Ho Chi Minh City',
            userRole: 'staff',
            userPassword: password,
        },
        {
            userName: 'Pham Van D',
            userPhone: '0976543210',
            userDateOfBirth: '09/09/1992',
            userEmail: 'phamvand@gmail.com',
            userAddress: 'Can Tho',
            userRole: 'staff',
            userPassword: password,
        },
        {
            userName: 'Do Thi E',
            userPhone: '0943216789',
            userDateOfBirth: '01/01/2000',
            userEmail: 'dothie@gmail.com',
            userAddress: 'Hai Phong',
            userRole: 'staff',
            userPassword: password,
        },

    ];

    users.map(async user => {
        const newUser = new User(user);
        await newUser.save();
    });
}

module.exports = {
    seedUser,
};