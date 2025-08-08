import jwt from "jsonwebtoken";

export const verifyUser = async (req, res, next) => {
  try {
    const {token} = req.cookies;

    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });

    const tokenDecode = await jwt.verify(token, process.env.SECRET_KEY);

    // TODO: Need to get user data from database and its set without password

    if (tokenDecode) {
      req.userId = tokenDecode.id;
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }

    next();
  } catch (error) {
    return res.status(500).json({success:false, message: `Internal server error ${error}`})
  }
};
