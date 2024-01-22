import express from "express";
import {
    handleUserSignup,
    handleUserLogin,
    userDataHandler,
} from "../controller/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", handleUserSignup);
router.post("/login", handleUserLogin);
router.get("/user", authMiddleware, userDataHandler);

export default router;
