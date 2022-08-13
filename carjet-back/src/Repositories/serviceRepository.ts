import { Service } from "@prisma/client";
import { networkInterfaces } from "os";
import { prisma } from "../config/database.js";

export type createService = Omit< Service, "id" | "createdAt" | "closedAt">

async function queryAll(){
    return await prisma.service.findMany({})
}

async function queryByProvider(providerId:number){
    return await prisma.service.findMany({
        where: { providerId }
    })
}

async function queryByCodeNameProvider(code:number,name:string,providerId:number){
    return await prisma.service.findUnique({
        where: { 
            name_code_providerId: { code,name,providerId } 
        }
    })
}

async function createUpdateService(createService:createService){
    const {name,code,providerId,quantity,specification} = createService;

    return await prisma.service.upsert({ 
        where: { 
            name_code_providerId: { name,code,providerId }
        },
        update: { closedAt: new Date()},
        create: { code,name,quantity,specification,providerId },
    })
}

export const serviceRepository = {
    queryAll,
    queryByProvider,
    queryByCodeNameProvider,
    createUpdateService
}