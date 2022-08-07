import { Request, Response } from "express";
import { excelService } from "../Services/excelService.js";

export default function uploadFile(req:Request,res:Response) {
    const file = req.file;

    const workSheet = excelService.parseSheet(file);

    console.log(workSheet);
    //response will be the database response not the json parse, is necessary to send id, wait for the final database format
    res.send(workSheet);
}