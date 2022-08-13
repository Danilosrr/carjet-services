import joi from "joi";
import { createStock } from "../Repositories/stockRepository.js";
import { formatedStockSheet } from "../Services/excelService.js";

export type stockBody = Omit<createStock,"providerId">;

export const stockSchema = joi.object<stockBody>({
    name: joi.string().required(),
    info: joi.string().required(),
    quantity:joi.number().required(),
});

export const formatedStockSchema = joi.object<formatedStockSheet>({
    status: joi.string().valid("novo","cadastrado").required(),
    providerId: joi.number().required(),
    name: joi.string().required(),
    info: joi.string().required(),
    quantity:joi.number().required(),
});