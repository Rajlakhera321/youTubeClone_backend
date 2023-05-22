import {Router} from "express";
import { addComment, deleteComment, getComment } from "../controller/comments";
import { verifyToken } from "../middleware/verifyToken";
const commentRoute = Router();

commentRoute.post("/", verifyToken, addComment);

commentRoute.delete("/:id", verifyToken, deleteComment);

commentRoute.get("/video/:id", verifyToken, getComment);

export default commentRoute;
