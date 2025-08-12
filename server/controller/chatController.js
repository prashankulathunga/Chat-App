import { generateStreamToken } from "../configs/stream.js";

export const getStreamToken = async (req, res) => {
  try {
    const token = generateStreamToken(req.userId);

    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};