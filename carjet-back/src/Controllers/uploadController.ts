import { Request, Response } from "express";

export default function uploadFile(req:Request,res:Response) {
    const file = req;
    console.log(file);
    res.send('arquivo lido');
}