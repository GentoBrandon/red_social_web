import AuthModel from "../models/authModel";
import { Request, Response, NextFunction} from "express";
import CustomError from "../../../utils/customError";
import jwt from'jsonwebtoken';
import authKey from "../../../config/authKey";
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
          const token = jwt.sign({person_id: resultInsert.person_id,user_name: user_name},authKey,{expiresIn:'1h'});
          console.log("token:",token);
          
          res.status(201).json({message:'Person created successfully'});
        }catch(error){
          next(error);
        }
      }
}