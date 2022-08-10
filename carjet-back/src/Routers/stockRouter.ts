import { Router } from "express";
import { getStockByProvider, uploadSheet } from "../Controllers/stockController.js";
import upload from "../Middlewares/uploadMiddleware.js";
import validToken from "../Middlewares/validateToken.js";

const stockRouter = Router()

stockRouter.post('/upload/stock/:id', validToken, upload.single('table'), uploadSheet)
stockRouter.get('/stock/:id', validToken, getStockByProvider)

export default stockRouter;