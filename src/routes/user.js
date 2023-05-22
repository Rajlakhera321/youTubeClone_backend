import { Router } from "express";
import {
  udpateUser,
  getUser,
  deleteUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
  getAllUsers,
} from "../controller/user";
import { verifyToken } from "../middleware/verifyToken";

const userRouter = Router();

userRouter.put("/update/:id", verifyToken, udpateUser);

userRouter.get("/find/:id", getUser);

userRouter.get("/", verifyToken, getAllUsers);

userRouter.delete("/:id", verifyToken, deleteUser);

userRouter.put("/sub/:id", verifyToken, subscribe);

userRouter.put("/unsub/:id", verifyToken, unsubscribe);

userRouter.put("/like/:id", verifyToken, like);

userRouter.put("/dislike/:id", verifyToken, dislike);

export default userRouter;
