import friendService from '../services/friendService';
import { Request, Response, NextFunction } from 'express';
import CustomError from '../../../utils/customError';
export default class FriendController {
  static async createFriend(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const friend = req.body;
      const result = await friendService.insertFriend(friend);
      if (!result.success) {
        const error = new CustomError('Failed to create friend', 500);
        throw error;
      }
      res.status(201).json({ msg: 'Friend created successfully' });
    } catch (error) {
      next(error);
    }
  }
}
