// functions
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = process.env;

function generateAccessToken(email) {
    return jwt.sign({email: email}, TOKEN_SECRET, {
        expiresIn: '1800s'
    });
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, TOKEN_SECRET, (err, jwt_object) => {
        // console.log("JWT error", err);
        // console.log("JWT jwt_object", jwt_object);

        if (err) {
            return res.sendStatus(403);
        }

        req.jwt_object = jwt_object;

        next();
    });
}

module.exports = {
    generateAccessToken,
    authenticateToken
}