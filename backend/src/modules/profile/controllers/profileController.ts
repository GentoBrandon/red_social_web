import CustomError from '../../../utils/customError';
import ProfileModel from '../models/profileModel';
import { Request, Response, NextFunction } from 'express';
export default class ProfileController {
  static async createProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const resultInsert = await ProfileModel.create(req.body);
      if (!resultInsert.success) {
        const error = new CustomError('Failed to create profile', 500);
        throw error;
      }
      res.status(201).json({ msg: 'Profile created successfully' });
    } catch (error) {
      next(error);
    }
  }
}
