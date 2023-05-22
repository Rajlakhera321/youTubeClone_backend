import {Router} from "express";
import { addVideo, getVideo, deleteVideo, updateVideo, addView, trend, random, sub, getByTag, search } from "../controller/video";
const vidoeRoute = Router();
import {verifyToken} from "../middleware/verifyToken"

vidoeRoute.post("/", verifyToken, addVideo);

vidoeRoute.put("/:id", verifyToken, updateVideo);

vidoeRoute.delete("/:id", verifyToken, deleteVideo);

vidoeRoute.get("/find/:id", verifyToken, getVideo);

vidoeRoute.put("/view/:id", verifyToken, addView);

vidoeRoute.get("/trend", trend);

vidoeRoute.get("/random", random);

vidoeRoute.get("/sub", verifyToken, sub);

vidoeRoute.get("/tag", getByTag);

vidoeRoute.get("/search", search);


export default vidoeRoute;
