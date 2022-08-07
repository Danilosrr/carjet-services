import XLSX from "xlsx";

function parseSheet(file:Express.Multer.File){
    const rawFile = XLSX.readFile(file.path);
    const workSheet = {};

    for (const sheetName of rawFile.SheetNames) {
        workSheet[sheetName] = XLSX.utils.sheet_to_json(rawFile.Sheets[sheetName]);
    } 

    return workSheet
}

export const excelService = {
    parseSheet
}