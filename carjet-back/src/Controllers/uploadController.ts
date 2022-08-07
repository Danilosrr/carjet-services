import { Request, Response } from "express";
import { excelService } from "../Services/excelService.js";

export default function uploadFile(req:Request,res:Response) {
    const file = req.file;

    const workSheet = excelService.parseSheet(file);

    console.log(workSheet);
    res.send();
}