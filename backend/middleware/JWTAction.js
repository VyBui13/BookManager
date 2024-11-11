const jwt = require('jsonwebtoken');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const generateAccessToken = (payload) => {
    try {
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
        return token;
    }
    catch (err) {

        console.log(err);
    }
}

const verifyToken = (req, res, next) => {
    // const authHeader = req.headers['authorization']
    // const token = authHeader && authHeader.split(' ')[1]
    console.log(req.cookies)
    const token = req.cookies.token;

    if (token == null) {
        console.log('Token is null')
        return res.status(401).json({
            status: 'error',
            message: 'Unauthorized'
        });
    }


    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log(err)
            return res.status(403).json({
                status: 'error',
                message: 'Forbidden'
            });
        }

        req.user = user
        next()
    })
}


module.exports = {
    generateAccessToken,
    verifyToken,
}