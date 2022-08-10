import { Service } from "@prisma/client";
import { prisma } from "../config/database.js";

export type createService = Omit< Service, "id" | "createdAt" | "closedAt">

async function queryAll(){
    return await prisma.service.findMany({})
}

async function queryByCodeName(code:number,name:string){
    return await prisma.service.findFirst({
        where: { code,name }
    })
}

async function createService(createService:createService){
    return await prisma.service.create({ data:createService })
}

export const serviceRepository = {
    queryAll,
    queryByCodeName,
    createService
}