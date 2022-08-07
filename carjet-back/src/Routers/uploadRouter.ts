import { Router } from "express";
import uploadFile from "../Controllers/uploadController.js";
import upload from "../Middlewares/uploadMiddleware.js";
import validToken from "../Middlewares/validateToken.js";

const uploadRouter = Router()

uploadRouter.post('/upload', upload.single('table'), uploadFile)

export default uploadRouter;