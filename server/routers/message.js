import express from "express";
import { getMessage, sendMessage } from "../controllers/messageController.js";
import { isAuth } from "../middlewares/auth.js";
const router = express.Router();

router.post("/send/:receiverId", isAuth, sendMessage);
router.get("/get-messages/:otherParticipantId", isAuth, getMessage);

export default router;
