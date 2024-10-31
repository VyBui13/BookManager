const jwt = require('jsonwebtoken');

const generateAccessToken = (payload) => {
    try {
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
    }
    catch (err) {
        console.log(err)
    }
    return token;
}

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log(err)
            return res.sendStatus(403)
        }

        req.user = user
        next()
    })
}



module.exports = {
    generateAccessToken
}