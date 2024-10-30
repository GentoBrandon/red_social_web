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
  static async getAllProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const resultData = await ProfileModel.getAll();
      if (!resultData.success) {
        const error = new CustomError('data Empty', 404);
        throw error;
      }
      res.status(200).json(resultData.data);
    } catch (error) {
      next(error);
    }
  }

  static async findProfileById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = req.params.id;
      const _id = parseInt(id);
      const resultFound = await ProfileModel.findById(_id);
      if (!resultFound.success) {
        const error = new CustomError('Data not found', 404);
        throw error;
      }
      res.status(200).json(resultFound.data);
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const idProfile = parseInt(id);
      const resultUpdate = await ProfileModel.update(idProfile, req.body);
      if (!resultUpdate.success) {
        const error = new CustomError(
          resultUpdate.message || 'Failed to update',
          500,
        );
        throw error;
      }
      res.status(200).json({ msg: 'Profile updated successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async deleteProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const resultDeleted = await ProfileModel.delete(parseInt(req.params.id));
      if (!resultDeleted.success) {
        const error = new CustomError(
          resultDeleted.message || 'Failed to delete',
          500,
        );
        throw error;
      }
      res.status(200).json({ msg: 'Profile deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}
