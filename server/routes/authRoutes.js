import express from "express";
import Auth from "../controller/auth.js";
import authenticate from "../auth/Authenticate.js";

const router = express.Router();

router.post("/register", Auth.Registration);
router.post("/login", Auth.login);
router.post("/logout", authenticate, Auth.logout);

export default router;
