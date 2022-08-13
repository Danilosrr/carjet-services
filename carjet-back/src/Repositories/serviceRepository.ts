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
    return await prisma.service.findFirst({
        where: { code,name,providerId }
    })
}

async function createService(createService:createService){
    return await prisma.service.create({ data:createService })
}

async function updateService(createService:createService){
    const {name,code} = createService;

    return await prisma.service.update({ 
        where: { 
            name_code: { name,code }
        },
        data: { closedAt: new Date() 
        } 
    })
}

export const serviceRepository = {
    queryAll,
    queryByProvider,
    queryByCodeNameProvider,
    createService,
    updateService
}