import { Request, Response, NextFunction } from 'express';
import UserCredentialsModel from '../models/userCredentiaModel';
import CustomError from '../../../utils/customError';
import { validationResult } from 'express-validator';
export default class UserCredentialsController {
  static async createUserCredential(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new CustomError('Invalid input', 422);
      error.details = errors.array();
      return next(error);
    }
    try {
      const resultInsert = await UserCredentialsModel.create(req.body);
      if (!resultInsert.success) {
        const error = new CustomError('Error creating User_credentials', 500);
        error.details = error.stack;
        throw error;
      }
      res.status(201).json({
        message: 'User_credentials created successfully',
        id: resultInsert.id,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getAllUserCredentials(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const resultData = await UserCredentialsModel.getAll();
      if (!resultData.success) {
        const error = new CustomError('Data empty', 404);

        error.stack = error.stack;
        throw error;
      }
      res.status(200).json(resultData.data);
    } catch (error) {
      next(error);
    }
  }
}
