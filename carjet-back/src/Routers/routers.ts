import { Router } from "express";
import locationRouter from "./locationRouter.js";
import providerRouter from "./providerRouter.js";
import serviceRouter from "./serviceRouter.js";
import stockRouter from "./stockRouter.js";
import uploadRouter from "./uploadRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use(userRouter);
router.use(locationRouter);
router.use(stockRouter);
router.use(providerRouter);
router.use(serviceRouter);
router.use(uploadRouter);

export default router;