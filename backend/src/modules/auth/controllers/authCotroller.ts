import AuthModel from "../models/authModel";
import { Request, Response, NextFunction} from "express";
import CustomError from "../../../utils/customError";
export default class AuthController {
    static async createPersonWithUserCredentials(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
          const {first_name,last_name,birth_date,email,user_name,password} = req.body;
          const person = {first_name,last_name,birth_date,email};
          const user_credential = {user_name,password};
          const resultInsert = await AuthModel.insertQwithTransaction(person,user_credential);
          if(!resultInsert.success){
            const error = new CustomError('Error Creating Person',500);
            throw error;
          }
          res.status(201).json({message:'Person created successfully'});
        }catch(error){
          next(error);
        }
      }
}