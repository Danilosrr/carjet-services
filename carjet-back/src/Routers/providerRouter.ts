import { Router } from "express";
import { getProviderInfo } from "../Controllers/stockController.js";
import validToken from "../Middlewares/validateToken.js";

const providerRouter = Router();

providerRouter.get('/provider/:id',validToken,getProviderInfo)

export default providerRouter;