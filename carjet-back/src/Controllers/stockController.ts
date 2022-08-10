import { Request, Response } from "express";
import { func } from "joi";
import { providerRepository } from "../Repositories/locationRepository.js";
import { stockRepository } from "../Repositories/stockRepository.js";
import { excelService } from "../Services/excelService.js";

export function uploadStockFile(req:Request,res:Response) {
    const id:number = +req.params.id;
    const file:Express.Multer.File = req.file;

    const workSheet = excelService.parseSheet(file);

    const formatSheet = excelService.formatSheet(workSheet,id);

    console.log(formatSheet);
    //response will be the database response not the json parse, is necessary to send id, wait for the final database format
    res.send(formatSheet);
}

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