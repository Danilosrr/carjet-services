import joi from "joi";
import { createService } from "../Repositories/serviceRepository.js";

export type serviceBody = Omit<createService,"providerId">;

export const serviceSchema = joi.object<serviceBody>({
    code: joi.number().required(),
    name: joi.string().required(),
    specification: joi.string().required(),
    quantity:joi.number().required(),
});