import { NextFunction, Request, Response } from "express";

const errorStatusCode = {
    unauthorized: 401,
    conflict: 409,
    unprocessable_entity: 422,
    failed_dependency: 424,
    not_found: 404,
    forbidden: 403,
    bad_request: 400,
    invalid_token: 498,
}

export function badRequestError(text?:string){
    return { type: "bad_request", message: text }
}
export function unauthorizedError(text?:string){
    return { type: "unauthorized", message: text }
}
export function conflictError(text?:string){
    return { type: "conflict", message: text }
}
export function unprocessableEntityError(text?:string){
    return { type: "unprocessable_entity", message: text }
}
export function failedDependencyError(text?:string){
    return { type: "failed_dependency", message: text }
}
export function notFoundError(text?:string){
    return { type: "not_found", message: text }
}
export function forbiddenError(text?:string){
    return { type: "forbidden", message: text }
}
export function invalidTokenError(text?:string){
    return { type: "invalid_token", message: text }
}

export default function handleErrors(error,req:Request,res:Response,next:NextFunction){
    if (error.type){
        return res.status(errorStatusCode[error.type]).send(error.message);
    }
    console.log(error);
    return res.sendStatus(500);
}