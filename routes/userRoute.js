import express from "express";
import { brochureDownload, contactUs } from "../controller/userController.js";

export const userRouter = express.Router();

userRouter.route("/file/download/").post(brochureDownload);

userRouter.route("/contact").post(contactUs);
