import { Router } from "express";
import locationRouter from "./locationRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use(userRouter);
router.use(locationRouter);

export default router;