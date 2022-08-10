import { Router } from "express";
import locationRouter from "./locationRouter.js";
import providerRouter from "./providerRouter.js";
import stockRouter from "./stockRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use(userRouter);
router.use(locationRouter);
router.use(stockRouter);
router.use(providerRouter);

export default router;