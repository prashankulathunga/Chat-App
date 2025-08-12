import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import cors from "cors";
import { connectDB } from "./configs/db.js";
import cookieParser from "cookie-parser";

// INFO: Route import section
import AuthRoute from "./routes/auth-route.js";
import UserRoute from "./routes/user-route.js";

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = ["http://localhost:5173"];

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

// INFO: MONGO Database connection section
await connectDB();

app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// NOTE: Route root section
app.use("/api/auth", AuthRoute);
app.use("/api/user", UserRoute);