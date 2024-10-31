import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import key from '../config/authKey';
import CustomError from '../utils/customError';
interface Pailod {
  user_name: string;
}
export default class AuthMiddleware {
  static async verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.cookies;
      if (!token) {
        const error = new CustomError('Unauthorized', 403);
        return next(error);
      }

      const decoded = jwt.verify(token, key) as Pailod;
      if (!decoded || !decoded.user_name) {
        return next(new CustomError('Invalid token payload', 403));
      }

      req.body.user_name = decoded.user_name;
      next();
    } catch (error) {
      next(error);
    }
  }
}
