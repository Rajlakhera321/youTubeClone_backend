import { createError } from "../../error";
import { userModel, videoModel } from "../model";

export const udpateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id === req.user.data) {
      const user = await userModel.findByIdAndUpdate(
        { _id: id },
        {
          $set: req.body,
        },
        { new: true }
      );
      return res.status(200).json({ message: "Data updated", user });
    }
    return next(createError(403, "You can only update your details"));
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id === req.user.data) {
      await userModel.findByIdAndDelete({ _id: id });
      return res.status(200).json({ message: "Data deleted" });
    }
    return next(createError(403, "You can only update your details"));
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const {id} = req.params
    const data = await userModel.findOne({_id: id});
    return res.status(200).json({data: data})
  } catch (error) {
    next(error)
  }
};

export const subscribe = async (req, res, next) => {
  try {
    await userModel.findByIdAndUpdate(req.user.data,{
      $push: {subscribedUser: req.params.id}
    })
    await userModel.findByIdAndUpdate(req.params.id,{
      $inc: {subscribers: 1}
    })
    return res.status(200).json({message: "Subscription Successfull."})
  } catch (error) {
    next(error)
  }
};

export const unsubscribe = async (req, res, next) => {
  try {
    await userModel.findByIdAndUpdate(req.user.data,{
      $pull: {subscribedUser: req.params.id}
    })
    await userModel.findByIdAndUpdate(req.params.id,{
      $inc: {subscribers: -1}
    })
    return res.status(200).json({message: "Unsubscription Successfull."})
  } catch (error) {
    next(error)
  }
};

export const like = async (req, res, next) => {
  try {
    const {data} = req.user;
    await videoModel.findByIdAndUpdate(req.params.id,{
      $addToSet: {likes: data},
      $pull: {dislikes: data}
    })
    return res.status(200).json({message: "You have liked the video."})
  } catch (error) {
    next(error)
  }
};

export const dislike = async (req, res, next) => {
  try {
    const {data} = req.user;
    await videoModel.findByIdAndUpdate(req.params.id,{
      $addToSet: {dislikes: data},
      $pull: {likes: data}
    })
    return res.status(200).json({message: "You have disliked the video."})
  } catch (error) {
    next(error)
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const data = await userModel.find();
    return res.status(200).json({data: data})
  } catch (error) {
    next(error)
  }
};
