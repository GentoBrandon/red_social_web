import {Request, Response, NextFunction, ErrorRequestHandler}from 'express';
import CustomError from '../utils/customError';
const erroHandling:ErrorRequestHandler = async (err:CustomError, req:Request, res:Response, next:NextFunction) => {
        console.log(err.stack)
        console.log(err.details)
         res.status(err.statusCode || 500).json({
            message : err.message || 'Internal Server Error',
            details: err.details || 'No details'
        })

    }
export default erroHandling;