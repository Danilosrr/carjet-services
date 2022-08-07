import { Router } from "express";
import uploadFile from "../Controllers/uploadController.js";
import validToken from "../Middlewares/validateToken.js";

const uploadRouter = Router()

uploadRouter.post('/upload', validToken, uploadFile)

export default uploadRouter;