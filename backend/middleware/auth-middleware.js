const jwt = require("jsonwebtoken");
const Admin = require("../models/admin-model");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        if(!token) {
            return res.status(401).send({ state: "false", msg: "Token is not provided" });
        }
        // const token = b_token.replace('Bearer ', '')
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode) {
            return res.status(401).send({ state: "false", msg: "Token is not valid" });
        }
        const existAdmin = await Admin.findOne({ id: decode.id });
        if(!existAdmin) {
            return res.status(401).send({ state: "false", msg: "Unauthorized person" });
        }
        console.log("decode", decode);
        decode.token = token;
        req.admin  = decode
        next();
    }
    catch (err) {
        console.log("API Error due to-1 : ", err);
    }
}

module.exports = authMiddleware 