import { PersonModel } from "../models/personModel";
import { Request, Response , NextFunction } from "express";
import CustomError from "../../../utils/customError";
import {validationResult} from 'express-validator'
export  default class PersonController {
    static async createPerson(req:Request,res:Response,next:NextFunction){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const error = new CustomError('Data not accepted',422);
            error.details = errors.array()
            return next(error);
        }
        
        try{
            const resultInsert = await PersonModel.createPerson(req.body);
            if(!resultInsert.success){
                const error  = new CustomError('Error Creating Person',500);
                throw error;
            }
             res.status(201).json({message: 'Person created successfully', id: resultInsert.id});

        }catch(error){
            next(error);
        }
    }
}