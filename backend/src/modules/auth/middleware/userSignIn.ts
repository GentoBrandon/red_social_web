import db from '../../../config/dbConfig';
import { Request, Response, NextFunction } from 'express';
import CustomError from '../../../utils/customError';
import { UserCredentialsService } from '../../user-credentials/services/userCredentialService';
import bcrypt from 'bcrypt';
export default class UserSignIn {
  static async verifyUserPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { user_name, password } = req.body;
      const userFound = await UserCredentialsService.findUserCredentialByUserName(user_name)
      if (!userFound.success) {
        const error = new CustomError(
          'Unauthorized User  not found, or is not correted ',
          403,
        );
        return next(error);
      }

      const passwordHashed = await bcrypt.compare(password, userFound.data.password);
      if (!passwordHashed) {
        const error = new CustomError('Password is not correct', 404);
        return next(error);
      }
      req.body.person_id = userFound.data.person_id;
      next();
    } catch (error) {
      next(error);
    }
  }
}
