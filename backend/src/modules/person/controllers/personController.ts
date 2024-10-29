import { PersonModel } from "../models/personModel";
import { Request, Response , NextFunction } from "express";
import customError from "../../../utils/customError";
export class PersonController {
    static async createPerson(req:Request,res:Response,next:NextFunction){
        try{
            const resultInsert = await PersonModel.createPerson(req.body);
            if(!resultInsert.success){
                const error  = new customError('Error Creating Person',500);
                throw error;
            }
            return res.status(201).json({message: 'Person created successfully', id: resultInsert.id});

        }catch(error){
            next(error);
        }
    }
}