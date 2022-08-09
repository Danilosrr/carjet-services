import XLSX from "xlsx";

function parseSheet(file:Express.Multer.File){
    const workBook = XLSX.readFile(file.path);

    const sheet_name_list = workBook.SheetNames;

    const workSheet = XLSX.utils.sheet_to_json(workBook.Sheets[sheet_name_list[0]]);

    return workSheet
}

function formatSheet(sheet:Object[],id:number){
    const formatedSheet = sheet.map(row => ({ ...row, providerId: +id }));
    return formatedSheet;
}

export const excelService = {
    parseSheet,
    formatSheet
}