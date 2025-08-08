import { StreamChat } from "stream-chat";
import "dotenv/config";

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

// TODO: Need to create token to stream client
const streamClientToken = async () => {};
