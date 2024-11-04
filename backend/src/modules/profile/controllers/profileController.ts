import CustomError from '../../../utils/customError';
import profileServices from '../services/profileServices';
import { Request, Response, NextFunction } from 'express';
export default class ProfileController {
  static async getAllProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const resultData = await profileServices.profileGetAllServices();
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
      const id = Number(req.params.id);
      const resultFound = await profileServices.profileGetIdService(id);
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
      const resultUpdate = await profileServices.profileUpdateService(
        idProfile,
        req.body,
      );
      if (!resultUpdate.success) {
        const error = new CustomError('Data not found ', 404);
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
      const idDelete = Number(req.params.id);
      const resultDeleted =
        await profileServices.profileDeleteIdServices(idDelete);
      if (!resultDeleted.success) {
        const error = new CustomError('Failed to delete', 500);
        throw error;
      }
      res.status(200).json({ msg: 'Profile deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}
