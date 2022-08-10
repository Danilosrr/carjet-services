import { Router } from "express";
import { getLocation } from "../Controllers/locationController.js";
import validToken from "../Middlewares/validateToken.js";

const locationRouter = Router();

locationRouter.get('/location',validToken,getLocation)

export default locationRouter;