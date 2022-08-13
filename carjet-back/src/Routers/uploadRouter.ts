import { Router } from "express";
import { uploadSheet } from "../Controllers/uploadController.js";
import upload from "../Middlewares/uploadMiddleware.js";
import validToken from "../Middlewares/validateToken.js";

const uploadRouter = Router()

uploadRouter.post('/upload/:id', validToken, upload.single('table'), uploadSheet)

export default uploadRouter;