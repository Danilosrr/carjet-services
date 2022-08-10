import { prisma } from "../config/database.js";

export type createProvider = createBranch
export type createBranch = {
    name:string
    location:Location
}
export type Location = {
    lat:number
    lng:number
}

async function queryAllBranches(){
    return await prisma.branch.findMany()
}

async function queryAllProviders(){
    return await prisma.provider.findMany()
}

async function findBranchByName(name:string){
    return await prisma.branch.findUnique({
        where: {name}
    })
}

async function findProviderByName(name:string){
    return await prisma.provider.findUnique({
        where: {name}
    })
}

async function findBranchById(id:number){
    return await prisma.branch.findUnique({
        where: {id}
    })
}

async function findProviderById(id:number){
    return await prisma.provider.findUnique({
        where: {id}
    })
}

async function createBranch(createBranch:createBranch){
    return await prisma.branch.create({ data:createBranch })
}

async function createProvider(createProvider:createProvider){
    return await prisma.provider.create({ data:createProvider })
}

export const branchRepository = {
    queryAllBranches,
    findBranchByName,
    findBranchById,
    createBranch,   
}

export const providerRepository = {
    queryAllProviders,
    findProviderByName,
    findProviderById,
    createProvider
}