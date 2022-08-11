import { Request, Response } from "express";
import { notFoundError } from "../Middlewares/errorHandler.js";
import { branchRepository } from "../Repositories/locationRepository.js";
import { serviceRepository } from "../Repositories/serviceRepository.js";
import { stockRepository } from "../Repositories/stockRepository.js";

export async function getServices(req:Request, res:Response){
    const id:number = +req.params.id;

    const branch = await branchRepository.findBranchById(id);
    if (!branch) throw notFoundError("branch not found")

    const branchStock = await serviceRepository.queryByProvider(branch.providerId);

    res.send(branchStock);
}