import { Stock } from "@prisma/client";
import { prisma } from "../config/database.js";

export type createStock = Omit< Stock, "id" | "createdAt">

async function createUpdateStock(stock:createStock) {
    const { name,providerId,quantity,info } = stock

    return await prisma.stock.upsert({ 
        where: { 
            name_providerId: { name,providerId }
        },
        update: { quantity: { increment: quantity } },
        create: { name,providerId,quantity,info },
    })
}

async function updateStock(stock:createStock) {
    const { name,providerId,quantity } = stock
    return await prisma.stock.update({ 
        where: { 
            name_providerId: { name,providerId }
        },
        data: {
            quantity: { increment: quantity }
        } 
    })
}

async function queryByProvider(providerId:number){
    return await prisma.stock.findMany({
        where: { providerId }
    })
}

async function findByNameProvider(name:string,providerId:number) {
    return await prisma.stock.findUnique({
        where: { 
            name_providerId: { providerId, name }
        },
    })
}

export const stockRepository = {
    createUpdateStock,
    updateStock,
    queryByProvider,
    findByNameProvider
}