import { Router } from "express";
import { getStockByProvider, uploadStockFile } from "../Controllers/stockController.js";
import upload from "../Middlewares/uploadMiddleware.js";
import validToken from "../Middlewares/validateToken.js";

const stockRouter = Router()

stockRouter.post('/upload/stock/:id', validToken, upload.single('table'), uploadStockFile)
stockRouter.get('/stock/:id', validToken, getStockByProvider)

export default stockRouter;