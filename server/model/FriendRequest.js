import mongoose from "mongoose";

const FriendRequestSchema = new mongoose.Schema(
  {
    sneder: {
      type: mongoose.Schema.Type.ObjectId,
      ref: "User",
      required: true,
    },
    recipient: {
      type: mongoose.Schema.Type.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted"],
      default: "pending",
    },
  },
  { timestamp: true },
);

const FriendRequest =
  mongoose.models.FriendRequest ||
  mongoose.model("FriendRequest", FriendRequestSchema);
