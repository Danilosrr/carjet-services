import joi from "joi"
import { bodyUser } from "../Repositories/userRepository";

export const signUpSchema = joi.object<bodyUser>({
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
    confirmPassword: joi.string().required().valid(joi.ref('password')).messages({
        "any.only": "password and confirmation should match"
    })
});

export const signInSchema = joi.object<bodyUser>({
    email: joi.string().email().required(),
    password: joi.string().required()
});