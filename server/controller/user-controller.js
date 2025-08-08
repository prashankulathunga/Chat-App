import User from "../model/UserModel.js";

export const getRecommendedUser = async (req, res) => {
  try {
    const userId = req.userId;

    // get recommendded users
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
        "fullName profilePic nativeLanguage leaningLangiage",
      );

    return res.status(200).json(user.friends);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
    console.log("Internal server error", error);
  }
};

export const friendRequest = async (req, res) => {
  try {
    // implements friend requests
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
    console.log("Internal server error", error);
  }
};
