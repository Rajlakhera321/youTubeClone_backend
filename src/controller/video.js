import { createError } from "../../error";
import { userModel, videoModel } from "../model";

export const addVideo = async (req, res, next) => {
  try {
    const data = await videoModel.create({
      ...req.body,
      userId: req.user.data,
    });
    return res.status(201).json({ message: "Video Added", data: data });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const video = await videoModel.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found"));
    if (req.user.data === video.userId) {
      const updateVideo = await videoModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return res
        .status(200)
        .json({ message: "Updated Successfully", updateVideo });
    }
    return next(createError(403, "You can only update your video!"));
  } catch (error) {
    next(error);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await videoModel.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found"));
    if (req.user.data === video.userId) {
      await videoModel.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "Video has been deleted" });
    }
    return next(createError(403, "You can only update your video!"));
  } catch (error) {
    next(error);
  }
};

export const getVideo = async (req, res, next) => {
  try {
    const video = await videoModel.findById(req.params.id);
    return res.status(200).json(video);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const addView = async (req, res, next) => {
  try {
    await videoModel.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    return res.status(200).json({ message: "View has been inscreased." });
  } catch (error) {
    next(error);
  }
};

export const random = async (req, res, next) => {
  try {
    const video = await videoModel.aggregate([{ $sample: { size: 40 } }]);
    return res.status(200).json(video);
  } catch (error) {
    next(error);
  }
};

export const trend = async (req, res, next) => {
  try {
    const video = await videoModel.find().sort({ views: -1 });
    return res.status(200).json(video);
  } catch (error) {
    next(error);
  }
};

export const sub = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.data);
    const subscribedChannels = user.subscribedUser;

    const list = await Promise.all(
      subscribedChannels.map((channelId) => {
        return videoModel.find({ userId: channelId });
      })
    );
    return res
      .status(200)
      .json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    console.log(error, "error found");
    next(error);
  }
};

export const getByTag = async (req, res, next) => {
  try {
    const tags = req.query.tag.split(",")
    const video = await videoModel.find({tags: {$in: tags}}).limit(20)
    return res.status(200).json(video);
  } catch (error) {
    next(error);
  }
};

export const search = async (req, res, next) => {
  try {
    const query = req.query.q
    const video = await videoModel.find({title: {$regex: query, $options: "i"}}).sort({ views: -1 });
    return res.status(200).json(video);
  } catch (error) {
    next(error);
  }
};
