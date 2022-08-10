import { Request, Response } from "express";
import { unprocessableEntityError } from "../Middlewares/errorHandler.js";
import { providerRepository } from "../Repositories/locationRepository.js";
import { stockRepository } from "../Repositories/stockRepository.js";
import { serviceSchema } from "../Schemas/serviceSchema.js";
import { excelService } from "../Services/excelService.js";

export async function uploadSheet(req:Request,res:Response) {
    const id:number = +req.params.id;
    const file:Express.Multer.File = req.file;
  
    const workSheet = excelService.parseSheet(file);
  
    const verifySchema = excelService.verifySchema(workSheet,serviceSchema);
    if (!verifySchema) throw unprocessableEntityError("invalid sheet format");
    
    const formatedSheet = await excelService.formatSheet(workSheet,id);
    
    console.log(formatedSheet)
    res.send(formatedSheet);
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