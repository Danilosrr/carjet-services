import { Request, Response } from "express";
import { badRequestError } from "../Middlewares/errorHandler.js";
import { branchRepository, providerRepository } from "../Repositories/locationRepository.js";

export async function getLocation(req:Request, res:Response){
    const { show }: any = req.query;

    if (show === "branch") {
        const query = await branchRepository.queryAllBranches();
        return res.send( query );
    }
    if (show === "provider") {
        const query = await providerRepository.queryAllProviders()
        return res.send(query);
    }

    throw badRequestError("query param not valid");
}