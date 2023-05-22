import { createError } from "../../error";
import { userModel } from "../model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const { name, email, img, subscribers, subscribedUser } =
      req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const data = await userModel.create({
      name,
      email,
      password: hash,
      img,
      subscribers,
      subscribedUser,
    });
    return res.status(201).json({ message: "User created successfully", data });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) return next(createError(400, "Wrong password!"));

    const token = jwt.sign({ data: user._id }, process.env.JWT_SECRET);
    const { password, ...others } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ data: others });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ data: user._id }, process.env.JWT_SECRET);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({ data: user._doc });
    } else {
      const newUser = await userModel.create({ ...req.body, fromGoogle: true });
      const token = jwt.sign({ data: newUser._id }, process.env.JWT_SECRET);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({ data: newUser._doc });
    }
  } catch (error) {
    next();
  }
};
