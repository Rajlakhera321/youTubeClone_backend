import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import route from "./src/routes";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
const port = process.env.PORT || 8080;

const connect = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("Connected to DB"))
    .catch((err) => {
      console.log("got error here")
      throw err;
    });
};

app.use(cookieParser());
app.use(express.json());
app.use("/api", route);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal server error";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(port, () => {
  connect();
  console.log(`connected to server on the port ${port}`);
});
