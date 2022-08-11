import { Branch, Service } from "@prisma/client";
import { providerRepository } from "../Repositories/locationRepository.js";

async function formatServices(services:Service[],branch:Branch){
    const stock = await providerRepository.findProviderById(branch.providerId);

    const formatedSheet = services.map( (service:Service) => {
        delete service.providerId;
        return {stock: stock.name,...service} 
    })
    
    return formatedSheet;
}

export const serviceService = {
    formatServices
}