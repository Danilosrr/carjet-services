import joi from "joi";
import { createService } from "../Repositories/serviceRepository.js";
import { formatedServiceSheet } from "../Services/excelService.js";

export type serviceBody = Omit<createService,"providerId">;

export const serviceSchema = joi.object<serviceBody>({
    code: joi.number().required(),
    name: joi.string().required(),
    specification: joi.string().required(),
    quantity:joi.number().required(),
});

export const formatedServiceSchema = joi.object<formatedServiceSheet>({
    status: joi.string().valid("novo","fechado","aberto").required(),
    code: joi.number().required(),
    name: joi.string().required(),
    specification: joi.string().required(),
    quantity:joi.number().required(),
    providerId: joi.number().required()
});