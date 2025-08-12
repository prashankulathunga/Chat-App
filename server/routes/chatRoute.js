import express from "express";
import { verifyUser } from "../middleware/authMiddleware.js";
import { getStreamToken } from "../controller/chatController.js";

const router = express.Router();

router.use(verifyUser);

router.get('/token', getStreamToken);

export default router;