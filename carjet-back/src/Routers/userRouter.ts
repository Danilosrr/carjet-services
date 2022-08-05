import { Router } from "express";
import { signIn, signUp } from "../Controllers/userController.js";
import validSchema from "../Middlewares/validateSchema.js";
import { signInSchema, signUpSchema } from "../Schemas/userSchema.js";

const userRouter = Router()

userRouter.post('/sign-in', validSchema(signInSchema), signIn)
userRouter.post('/sign-up', validSchema(signUpSchema), signUp)

export default userRouter;