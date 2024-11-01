import db from '../../../config/dbConfig';
import { Request, Response, NextFunction } from 'express';
import CustomError from '../../../utils/customError';
import AuthModel from '../models/authModel';
import bcrypt from 'bcrypt';
export default class UserSignIn {
  static async verifyUserPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { user_name, password } = req.body;
      const userFound = await AuthModel.findUserPerson({ user_name });
      if (!userFound.success) {
        const error = new CustomError(
          'Unauthorized User  not found, or is not correted ',
          403,
        );
        return next(error);
      }

      const passwordHashed = await bcrypt.compare(password, userFound.password);
      if (!passwordHashed) {
        const error = new CustomError('Password is not correct', 404);
        return next(error);
      }
      req.body.person_id = userFound.person_id;
      next();
    } catch (error) {
      next(error);
    }
  }
}
