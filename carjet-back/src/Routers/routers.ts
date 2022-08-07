import { Router } from "express";
import locationRouter from "./locationRouter.js";
import uploadRouter from "./uploadRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use(userRouter);
router.use(locationRouter);
router.use(uploadRouter);

export default router;