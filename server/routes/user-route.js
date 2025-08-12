import express from "express";
import { verifyUser } from "../middleware/authMiddleware.js";
import {
  getRecommendedUser,
  getMyFriends,
  friendRequest,
  acceptFriendRequest,
  getFriendRequest,
  getOutgoingFriendReq
} from "../controller/user-controller.js";

const router = express.Router();

application.use(verifyUser);

router.get("/", getRecommendedUser);
router.get("/friends", getMyFriends);
router.post("friend-req/:id", friendRequest);
router.post("friend-req/:id/accept", acceptFriendRequest);
router.get("friend-requests", getFriendRequest);
router.get('/outgoing-friend-request', getOutgoingFriendReq);

export default router;
