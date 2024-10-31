import AuthModel from "../models/authModel";
import { Request, Response, NextFunction} from "express";
import CustomError from "../../../utils/customError";
import jwt from'jsonwebtoken';
import authKey from "../../../config/authKey";
import { serialize } from "cookie";
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
          const token = jwt.sign({person_id: resultInsert.person_id,user_name: user_name},authKey,{
            algorithm : 'HS256',
            allowInsecureKeySizes:true,
            expiresIn:'1h'});
          console.log("token:",token);
          const tokenSerialized = serialize('token',token,{
            httpOnly:true,
            secure:true,
            sameSite:'strict',
            path:'/',
            maxAge:3600,
          })
          res.setHeader('Set-Cookie',tokenSerialized);
          res.status(201).json({message:'Person created successfully'});
        }catch(error){
          next(error);
        }
      }

      static async login(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
          const {person_id,user_name} = req.body;
          const pailod = {person_id,user_name};
          const result = await AuthModel.findUserPerson(pailod);
          if(!result.success){
            const error = new CustomError('Error Finding User or Person',500);
            throw error;
          }
          res.status(200).json({message:'User and Person found successfully',
          user:result.user,
          person:result.person
          });
        } catch (error) {
          next(error)
        }
      }
}