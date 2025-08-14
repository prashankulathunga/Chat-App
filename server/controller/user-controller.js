import FriendRequest from "../model/FriendRequest.js";
import User from "../model/UserModel.js";

export const getRecommendedUser = async (req, res) => {
  try {
    const userId = req.userId;

    // get recommended users
    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: userId } }, // exclude current user
        { $_id: { $nin: userId.friends } }, // exclude current users friends
        { isOnboard: true },
      ],
    });

    return res.status(200).json(recommendedUsers);
  } catch (error) {
    console.log("Internal server error", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getMyFriends = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePic nativeLanguage learningLanguage"
      );

    return res.status(200).json(user.friends);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const friendRequest = async (req, res) => {
  try {
    // implements friend requests

    const myId = req.userId;
    const { id: recipientId } = req.params;

    // prevent sending req to yourself

    const recipence = await User.findById(recipientId);

    if (!recipientId)
      return res
        .status(404)
        .json({ success: false, message: "Recipient not found" });

    if (myId == recipientId)
      return res.status(400).json({
        success: false,
        message: "You can not send friend request yourself",
      });

    // check alrady is friend
    if (recipence.friends.includes(myId))
      return res
        .status(400)
        .json({ success: false, message: "you are already friends" });

    //check request alrady exists
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipent: myId },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: "A friend request already exists between you and this user",
      });
    }

    const createFriendReq = FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    return res.status(200).json(createFriendReq);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const { id: requestId } = req.params;

    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res
        .status(404)
        .json({ success: false, message: "friend request not found" });
    }

    // verify the current user is the recipient
    if (friendRequest.recipient.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized accept this friend request",
      });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    // add each user to the other's friends array
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipent },
    });

    await User.findByIdAndUpdate(friendRequest.recipent, {
      $addToSet: { friends: friendRequest.sender },
    });

    return res
      .status(200)
      .json({ success: true, message: "Friend request accepted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getFriendRequest = async (req, res) => {
  try {
    await FriendRequest.find({
      recipient: req.userId,
      status: "pending",
    }).populate("sender", "fullname, profilePic");
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getOutgoingFriendReq = async (res, req) => {
  try {
    await FriendRequest.find({
      sender: req.userId,
      status: "pending",
    }).populate(
      "recipient",
      "fullname profilePic nativeLanguage learningLanguage"
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
