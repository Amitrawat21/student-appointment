import Jwt from "jsonwebtoken";
import User from "../Model/User.js";
const secret = "amit";

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token, "kaaaaa");

    const verifytoken = Jwt.verify(token, secret);
    console.log(verifytoken, "verif");

    const rootuser = await User.findById({ _id: verifytoken.id });
    console.log(rootuser, "rooooooooooooooo");

    if (!rootuser) {
      throw new Error("user not found");
    }

    req.token = token;
    req.rootuser = rootuser;
    req.userId = rootuser._id;

    next();
  } catch (error) {
    res
      .status(401)
      .json({ status: 401, message: "Unauthorized no token provide" });
  }
};

export default authenticate;
