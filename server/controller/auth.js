import User from "../Model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const secret = "amit";
class Auth {
  constructor() {}

  static Registration = async (req, res) => {
    const { name, email, phone, role, institute, password } = req.body;
    if (!name || !email || !phone || !role || !institute || !password)
      res.status(422).json({ error: "fill all the detail" });
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(403).json({ msg: "User already exists" });
      }

      user = new User({ name, email, phone, role, institute, password });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      let result = await user.save();
      res.status(201).json({ success: true, response: result });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  };

  static login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "user not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ msg: "Incorrect password" });
      }

      jwt.sign(
        { id: user._id },
        secret,
        { expiresIn: 360000 },
        (err, token) => {
          res.json({ success: true, token: token, user: user });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  };

  static logout = async (req, res) => {
    try {


      res.json({ success: true, message: "Logged out successfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
}

export default Auth;
