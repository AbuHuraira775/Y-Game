const jwt = require("jsonwebtoken");
const Admin = require("../models/admin-model");
var ObjectId = require("mongodb").ObjectId;

const authVerify = async (req, res, next) => {
  try {
    const { id, token, apiType } = req.body;
    console.log(req.body);
    var o_id = new ObjectId(id);
    const existAdmin = await Admin.findOne({ _id: o_id });
    if (existAdmin) {
        console.log("existId", existAdmin);
        if (!existAdmin.isVerified){
          return res
            .status(400)
            .send({
              state: "false",
              msg:
                "Currently your account is not verified, Please verify your account first",
            }); 
        }
        else {
          jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
            if (err) {
              return res
                .status(401)
                .send({  state: "false" , msg: "Unauthorized person"});
            } else {
              if (existAdmin?.type === "admin") {
                if (apiType == "route") {
                  return res
                    .status(200)
                    .send({ msg: "Authorized person", state: "true" });
                } else {
                  req.userData = existId;
                  next();
                }
              } else {
                return res
                  .status(400)
                  .send({
                    state: "false",
                    msg: "This service is only for Admin!",
                  });
              }
            }
          });
        }
      } else {
        return res
          .status(400)
          .send({  state: "failure", msg: "unauthorized person" });
}
  } catch (err) {
    console.log("API Error due to : ", err);
  }
};

module.exports = { authVerify };
