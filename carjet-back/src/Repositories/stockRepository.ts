import { Stock } from "@prisma/client";
import { prisma } from "../config/database.js";

export type createStock = Omit< Stock, "id" | "createdAt">

async function updateStock(stock:Stock) {
    const {name,quantity} = stock;

    return await prisma.stock.update({
        where: { name },
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

export const stockRepository = {
    updateStock,
    queryByProvider
}