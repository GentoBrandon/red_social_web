import CustomError from "../../../utils/customError";
import db from "../../../config/dbConfig";
import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt';

export default class UserSignUp {
    static async verifyUser(req:Request,res:Response,next:NextFunction){
        try {
            const {user_name} = req.body
            const userFound = await db('users_credentials').where({user_name}).first();
            if(userFound){
                const error = new CustomError('User Name is alreayd used ',400);
                next(error);
            }
            next();
        } catch (error) {
            next(error);
        }
        
    }

    static async verifyEmail(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const {email} = req.body;
            const emailFound = await db('persons').where({email}).first();
            if(emailFound){
                const error = new CustomError('Email is already used',400);
                throw error;
            }
            next();
        } catch (error) {
            next(error);
        }
    }

    static async hashPassword(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const {password} = req.body;
            const hash = await bcrypt.hash(password,10);
            req.body.password = hash;
            next();
        } catch (error) {
            next(error);
        }
    }
    
}