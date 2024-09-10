const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {

    const token = req.header('Authorization')
    if (!token) {
        return res.status(401).send({ state:false, message: 'Access denied. No token provided.' });
    }
    else {

        try {
            const decode = jwt.verify(token, process.env.SECRET_KEY)
            req.user = decode
            next()
        }
        catch (error) {
            res.status(400).send({ state:false, message: 'Invalid token.' });
        }
    }
}

module.exports = verifyToken