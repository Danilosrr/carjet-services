import { Router } from "express"
import { getServices } from "../Controllers/serviceController.js"
import validToken from "../Middlewares/validateToken.js"

const serviceRouter = Router()

serviceRouter.get('/services/:id', validToken, getServices)

export default serviceRouter;
