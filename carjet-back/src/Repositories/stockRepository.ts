import { Stock } from "@prisma/client";
import { prisma } from "../config/database.js";

export type createStock = Omit< Stock, "id" | "createdAt">

async function updateStock(stock:Stock) {
    const {id,quantity} = stock;

    return await prisma.stock.update({
        where: { id },
        data: {
            quantity
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
    updateStock,
    queryByProvider,
    findByNameProvider
}