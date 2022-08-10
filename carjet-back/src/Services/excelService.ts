import Joi, { Schema } from "joi";
import XLSX from "xlsx";
import { unprocessableEntityError } from "../Middlewares/errorHandler.js";

function parseSheet(file:Express.Multer.File){
    const workBook = XLSX.readFile(file.path);

    const sheet_name_list = workBook.SheetNames;

    const workSheet:Object[] = XLSX.utils.sheet_to_json(workBook.Sheets[sheet_name_list[0]]);

    return workSheet
}

function formatSheet(sheet:Object[],id:number){
    const formatedSheet = sheet.map(row => ({ ...row, providerId: +id }));
    return formatedSheet;
}

function verifySchema(sheet:Object[],schema:Schema){
    let verify = true;
    sheet.forEach( row => { 
            const validation = schema.validate(row, { abortEarly: true });      
            if (validation.error) verify = false
    });
    return verify;
}

export const excelService = {
    parseSheet,
    formatSheet,
    verifySchema
}