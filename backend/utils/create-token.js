const jwt = require('jsonwebtoken')
const Admin = require('../models/admin-model')

const createToken = async (email, type) => {
    return jwt.sign({
        type: type,
        email: email
    }, process.env.SECRET_KEY, { expiresIn: '10d' })
}

module.exports = createToken