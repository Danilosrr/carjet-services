import { Request, Response } from "express";
import { unprocessableEntityError } from "../Middlewares/errorHandler.js";
import { formatedServiceSchema, serviceSchema } from "../Schemas/serviceSchema.js";
import { formatedStockSchema, stockSchema } from "../Schemas/stockSchema.js";
import { excelService } from "../Services/excelService.js";

export async function uploadSheet(req:Request,res:Response) {
    const id:number = +req.params.id;
    const file:Express.Multer.File = req.file;
  
    const workSheet = excelService.parseSheet(file);
  
    const verifySchemaService = excelService.verifySchema(workSheet,serviceSchema);
    const verifySchemaStock = excelService.verifySchema(workSheet,stockSchema);

    if (!verifySchemaService && !verifySchemaStock) throw unprocessableEntityError("invalid sheet format");
    
    let formatedSheet:Object[];
    if (verifySchemaService) formatedSheet = await excelService.formatServiceSheet(workSheet,id);
    if (verifySchemaStock) formatedSheet = await excelService.formatStockSheet(workSheet,id);

    const deleteFile = excelService.deleteSheet(file);

    console.log(formatedSheet);
    res.send(formatedSheet);
}

export async function databaseSheet(req:Request,res:Response) {
    const sheet = req.body;

    const verifySchemaService = excelService.verifySchema(sheet,formatedServiceSchema);
    const verifySchemaStock = excelService.verifySchema(sheet,formatedStockSchema);

    if (!verifySchemaService && !verifySchemaStock) throw unprocessableEntityError("invalid sheet format");

    let register;
    if (verifySchemaService) register = await excelService.registerServiceSheet(sheet);
    if (verifySchemaStock) register = await excelService.registerStockSheet(sheet);

    res.send(register);
}