import jwt from "jsonwebtoken";
import { conflictError, forbiddenError, notFoundError } from "../Middlewares/errorHandler.js";
import { bodyUser, createUser, userRepository } from "../Repositories/userRepository.js";
import { compare, encrypt } from "../Utils/encryptUtils.js";

async function signUpService(createUser:createUser){
    const { email } = createUser;

    if ( !isNaN(+createUser.password) ) throw forbiddenError("passwords cant be only numbers");

    const password = await encrypt(createUser.password);

    const conflict = await userRepository.findByEmail(email);
    if (conflict) throw conflictError("email already used");

    const signUp = await userRepository.createUser({ email, password });
    return signUp;
};

async function signInService(createUser:createUser){
    const { email, password }:{ email:string, password:string } = createUser;

    const emailFound = await userRepository.findByEmail(email);
    if (!emailFound) throw notFoundError("email not found");

    const passwordMatch = compare(password, emailFound.password);
    if (!passwordMatch) throw forbiddenError("incorrect password");

    const token = jwt.sign({...createUser,id:emailFound.id}, process.env.JWT_KEY);
    return { token: token }
};

async function comparePasswords(user:bodyUser){
    const { confirmPassword,password } = user;

    if (confirmPassword !== password) throw forbiddenError("passwords not matching");
    const userVerified:createUser = { email: user.email, password};

    return userVerified;
};

export const userServices = {
    comparePasswords,
    signInService,
    signUpService
}