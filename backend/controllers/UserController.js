const generateAccessToken = require('../middleware/JWTAction');

class UserController {
    token(req, res) {
        const { username, password } = req.body;
        const payload = { username, password };
        const token = generateAccessToken(payload);
        res.json({ token });
    }
}

module.exports = UserController;