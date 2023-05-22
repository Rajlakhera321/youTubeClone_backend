import { commentModel, videoModel } from "../model";

export const addComment = async (req, res, next) => {
    try {
        const data = await commentModel.create({
            userId: req.user.data,
            ...req.body
        })
        return res.status(201).json({message: "Commend added", data: data})
    } catch (error) {
        next(error)
    }
}

export const deleteComment = async (req, res, next) => {
    try {
        const comment = await commentModel.findById(req.params.id);
        const video = await videoModel.findById(req.params.id);
        if(req.user.data === comment.userId || req.user.data === video.userId){
            await commentModel.findByIdAndDelete(req.params.id)
            return res.status(200).json({message: "Comment has been deleted."})
        }
        return res.status(403).json({message: "You can only delete your comment!"});
    } catch (error) {
        next(error)
    }
}

export const getComment = async (req, res, next) => {
    try {
        const data = await commentModel.find({videoId: req.params.id});
        return res.status(200).json(data);
    } catch (error) {
        next(error)
    }
}