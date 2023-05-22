import express from "express";
import { googleAuth, signin, signup } from "../controller/auth";

const authRouter = express.Router();

authRouter.post("/signup", signup);

authRouter.post("/login", signin);

authRouter.post("/google", googleAuth);

export default authRouter