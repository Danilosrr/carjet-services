import joi from "joi";
import { createStock } from "../Repositories/stockRepository.js";

export type stockBody = Omit<createStock,"providerId">;

export const stockSchema = joi.object<stockBody>({
    name: joi.string().required(),
    info: joi.string().required(),
    quantity:joi.number().required(),
});