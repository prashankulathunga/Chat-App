import express from "express";
import { verifyUser } from "../middleware/authMiddleware.js";
import {
  getRecommendedUser,
  getMyFriends,
  friendRequest,
} from "../controller/user-controller.js";

const router = express.Router();

router.get("/", verifyUser, getRecommendedUser);
router.get("/friends", verifyUser, getMyFriends);
router.post("friend-req/:id", verifyUser, friendRequest);

export default router;
