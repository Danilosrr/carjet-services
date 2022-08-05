import { Request, Response, Router } from "express";
import validToken from "../Middlewares/validateToken.js";

const locationRouter = Router();

locationRouter.get('/location',validToken,(req:Request,res:Response)=>{ res.send('ok') })

export default locationRouter;