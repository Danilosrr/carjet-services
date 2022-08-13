import { Request, Response } from "express";
import { unprocessableEntityError } from "../Middlewares/errorHandler.js";
import { serviceSchema } from "../Schemas/serviceSchema.js";
import { stockSchema } from "../Schemas/stockSchema.js";
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

    console.log(formatedSheet)
    res.send(formatedSheet);
}