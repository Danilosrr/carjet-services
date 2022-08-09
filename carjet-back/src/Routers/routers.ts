import { Router } from "express";
import locationRouter from "./locationRouter.js";
import stockRouter from "./stockRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use(userRouter);
router.use(locationRouter);
router.use(stockRouter);

export default router;