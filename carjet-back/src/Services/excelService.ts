import { Schema } from "joi";
import XLSX from "xlsx";
import { createService, serviceRepository } from "../Repositories/serviceRepository.js";

function parseSheet(file:Express.Multer.File){
    const workBook = XLSX.readFile(file.path);

    const sheet_name_list = workBook.SheetNames;

    const workSheet:Object[] = XLSX.utils.sheet_to_json(workBook.Sheets[sheet_name_list[0]]);

    return workSheet
}

async function formatSheet(sheet:Object[],id:number){
    const idSheet = sheet.map(row => ({ ...row, providerId: +id }));

    const formatedSheet = await Promise.all( 
        idSheet.map( async (row:createService) => {
            const query = await serviceRepository.queryByCodeName(row.code,row.name);
            if (!query) return {...row, status: 'inexistente'}
            else return {...row, status:'existe'}
        })
    )
    
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