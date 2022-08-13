import { Router } from "express";
import { getStockByProvider } from "../Controllers/stockController.js";
import validToken from "../Middlewares/validateToken.js";

const stockRouter = Router()

stockRouter.get('/stock/:id', validToken, getStockByProvider)

export default stockRouter;