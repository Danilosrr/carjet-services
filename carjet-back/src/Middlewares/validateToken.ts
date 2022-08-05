import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { unauthorizedError } from "./errorHandler.js";
import { token, userRepository } from "../Repositories/userRepository.js";
import { compare } from "../Utils/encryptUtils.js";

export default async function validToken(req:Request,res:Response,next:NextFunction){
    const { authorization } = req.headers;    
    const secretKey = process.env.JWT_KEY;
 
    const token = authorization?.replace("Bearer ", "").trim();
    if (!token) throw unauthorizedError("missing token");
        
    const verify = jwt.verify(token, secretKey, function(err){ 
        if (err) throw unauthorizedError("unauthorized token format");
    });
    const tokenObj = jwt.decode(token) as token;

    await tokenDatabase(tokenObj);
    res.locals.token = tokenObj;

    next();
}

async function tokenDatabase(token:token) {
    const {email,password} = token;

    const user = await userRepository.findByEmail(email);
    if(!user) throw unauthorizedError("unauthorized token");

    const passwordMatch = compare(password,user.password);
    if(!passwordMatch) throw unauthorizedError("unauthorized token");

    return
}