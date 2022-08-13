import { Request, Response } from "express";
import { providerRepository } from "../Repositories/locationRepository.js";
import { stockRepository } from "../Repositories/stockRepository.js";

export async function getStockByProvider(req:Request,res:Response){
    const id:number = +req.params.id;

    const query = await stockRepository.queryByProvider(id);

    res.send(query);
}

export async function getProviderInfo(req:Request,res:Response){
    const id:number = +req.params.id;

    const provider = await providerRepository.findProviderById(id);

    res.send(provider);
}