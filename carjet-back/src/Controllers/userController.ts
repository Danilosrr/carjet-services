import { Request, Response } from "express";
import { bodyUser, createUser } from "../Repositories/userRepository.js";
import { userServices } from "../Services/userService.js";

export async function signUp(req:Request, res:Response){
    const newUser:bodyUser = req.body;

    const bodyVerified = await userServices.comparePasswords(newUser);
    const signUp = await userServices.signUpService(bodyVerified);

    res.status(201).send(signUp);
}

export async function signIn(req:Request, res:Response){
    const user:createUser = req.body;

    const signIn = await userServices.signInService(user);

    res.send(signIn);
}