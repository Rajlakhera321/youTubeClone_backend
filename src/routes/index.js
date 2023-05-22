import {Router} from "express";
const route = Router();
import userRouter from "./user"
import authRouter from "./auth";
import vidoeRoute from "./video";
import commentRoute from "./comments";

route.use("/user", userRouter)

route.use("/auth", authRouter)

route.use("/video", vidoeRoute)

route.use("/comment", commentRoute)

export default route