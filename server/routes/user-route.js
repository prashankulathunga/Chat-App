import express from "express";
import { verifyUser } from "../middleware/authMiddleware.js";
import {
  getRecommendedUser,
  getMyFriends,
  friendRequest,
  acceptFriendRequest
} from "../controller/user-controller.js";

const router = express.Router();

router.get("/", verifyUser, getRecommendedUser);
router.get("/friends", verifyUser, getMyFriends);
router.post("friend-req/:id", verifyUser, friendRequest);
router.post("friend-req/:id/accept", verifyUser, acceptFriendRequest);

export default router;
