import { Schema } from "joi";
import XLSX from "xlsx";
import fs from "fs";
import { createService, serviceRepository } from "../Repositories/serviceRepository.js";
import { createStock, stockRepository } from "../Repositories/stockRepository.js";

export type formatedServiceSheet = {
    status: string;
    code: number;
    name: string;
    specification: string;
    quantity: number;
    providerId: number;
}

export type formatedStockSheet = {
    status: string;
    providerId: number;
    name: string;
    info: string;
    quantity: number;
}

function parseSheet(file:Express.Multer.File){
    const workBook = XLSX.readFile(file.path);

    const sheet_name_list = workBook.SheetNames;

    const workSheet:Object[] = XLSX.utils.sheet_to_json(workBook.Sheets[sheet_name_list[0]]);

    return workSheet
}

async function formatStockSheet(sheet:Object[],id:number){
    const idSheet = sheet.map(row => ({ ...row, providerId: +id }));
    
    const formatedSheet = await Promise.all( 
        idSheet.map( async (row:createStock) => {
            const query = await stockRepository.findByNameProvider(row.name,row.providerId);
            if (!query) return {...row, status: 'novo'}
            if (query) return {...row, status: 'cadastrado'}
        })
    )
    
    return formatedSheet;
}

async function formatServiceSheet(sheet:Object[],id:number){
    const idSheet = sheet.map(row => ({ ...row, providerId: +id }));
    
    const formatedSheet = await Promise.all( 
        idSheet.map( async (row:createService) => {
            const query = await serviceRepository.queryByCodeNameProvider(row.code,row.name,row.providerId);
            if (!query) return {...row, status: 'novo'}
            if (!query.closedAt) return {...row, status:'aberto'} 
            if (query.closedAt) return {...row, status:'fechado'}
        })
    )
    
    return formatedSheet;
}

async function registerServiceSheet(sheet:formatedServiceSheet[]){ 
    const register = await Promise.all( 
        sheet.map( async (row) => {
            if (row.status === 'novo') { delete row.status; serviceRepository.createService(row)}
            if (row.status === 'aberto') { delete row.status; serviceRepository.updateService(row)}
        })
    )
    return register;
}

async function registerStockSheet(sheet:formatedStockSheet[]){    
    const register = await Promise.all( 
        sheet.map( async (row) => {
            if (row.status === 'novo') { delete row.status; stockRepository.createStock(row)}
            if (row.status === 'cadastrado') { delete row.status; stockRepository.updateStock(row)}
        })
    )
    
    return register;
}

function verifySchema(sheet:Object[],schema:Schema){
    let verify = true;
    sheet.forEach( row => { 
        const validation = schema.validate(row, { abortEarly: true });      
        if (validation.error) verify = false
    });
    return verify;
}

function deleteSheet(file:Express.Multer.File){
    const deleteFile = fs.unlink(file.path, (err) => console.log(`file ${file.filename} was deleted`));

    return deleteFile;
}

export const excelService = {
    parseSheet,
    formatServiceSheet,
    formatStockSheet,
    registerServiceSheet,
    registerStockSheet,
    verifySchema,
    deleteSheet
}