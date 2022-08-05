import { User } from "@prisma/client";
import { prisma } from "../config/database.js";

export type createUser = Omit<User,"id">
export type bodyUser = createUser & {
    confirmPassword: string
}
export type token = {
    id: number
    email: string
    password: string
    iat: number
}

async function findByEmail(email:string){
    return await prisma.user.findFirst({
        where: {email}
    });
}

async function createUser(createUser:createUser){
    return await prisma.user.create({ data:createUser });
}

export const userRepository = {
    findByEmail,
    createUser
}