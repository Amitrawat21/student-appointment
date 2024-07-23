import express from "express";
import user from "../controller/user.js";
import authenticate from "../auth/Authenticate.js";

const router = express.Router();

router.get("/userInfo/:id", user.getUser);
router.put("/userUpdate/:id",authenticate ,  user.userUpdate);
router.delete("/userDelete/:id", user.deleteUser);
router.get("/getAllteacher", user.getallTeacher);

export default router;
