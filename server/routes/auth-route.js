import express from "express";
import {
  CheckAuth,
  Login,
  LogOut,
  Onboard,
  Register,
} from "../controller/auth-controller.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const route = express.Router();

route.post("/create", Register);
route.post("/login", Login);
route.get("/logout", verifyUser, LogOut);
route.post("/onboard", verifyUser, Onboard);
route.get("/check-auth", verifyUser, CheckAuth);

export default route;
