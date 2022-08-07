import { Request, Response } from "express";

export default function uploadFile(req:Request,res:Response) {
    const body = req.body
    const file = req.file
    console.log(file);
    res.send(body)
}