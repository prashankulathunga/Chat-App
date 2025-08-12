import "dotenv/config";
import { StreamChat } from "stream-chat";

const stream_api_key = process.env.STREAM_API_KEY;
const stream_secret_key = process.env.STREAM_API_SECRET;

if (!stream_api_key || !stream_secret_key) {
  console.log("Missing API key or API secret");
}

// create instance with stream
const streamclient = StreamChat.getInstance(stream_api_key, stream_secret_key);

// need to user data save
export const upsertStreamUser = async (userData) => {
  try {
    await streamclient.upsertUser(userData);
    return userData;
  } catch (error) {
    console.log("Error happen create upsertUser", error);
  }
};

export const generateStreamToken = async (userId) => {
  try {
    // info: ensure userId is a string
    const userIdStr = userId.toString();
    return streamclient.createToken(userIdStr);
  } catch (error) {
    console.log("Error happen while steam generating stream token");
  }
};
