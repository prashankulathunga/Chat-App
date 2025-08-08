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

route.use(verifyUser);

route.post("/create", Register);
route.post("/login", Login);
route.get("/logout", LogOut);
route.post("/onboard", Onboard);
route.get("/check-auth", CheckAuth);

export default route;
