import express from "express";
import {
  getOtherUsers,
  getProfile,
  login,
  logout,
  register,
} from "../controllers/userController.js";
import {isAuth} from "../middlewares/auth.js"

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/get-profile", isAuth, getProfile);
router.get("/get-other-users", isAuth, getOtherUsers);

export default router;
