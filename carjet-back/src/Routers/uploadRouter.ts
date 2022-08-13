import { Router } from "express";
import { databaseSheet, uploadSheet } from "../Controllers/uploadController.js";
import upload from "../Middlewares/uploadMiddleware.js";
import validToken from "../Middlewares/validateToken.js";

const uploadRouter = Router()

uploadRouter.post('/upload/:id', validToken, upload.single('table'), uploadSheet)
uploadRouter.post('/database/upload', validToken, databaseSheet)

export default uploadRouter;