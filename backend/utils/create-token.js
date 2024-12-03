const jwt = require('jsonwebtoken')

const createToken = async (email, id, type) => {
    return jwt.sign({
        id: id,
        type: type,
        email: email
    }, process.env.SECRET_KEY, { expiresIn: '10d' })
}

module.exports = createToken