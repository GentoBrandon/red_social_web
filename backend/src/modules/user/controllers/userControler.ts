import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/userModel';
import CustomError from '../../../utils/customError';

export default class UserContoller {
  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { users_credentials_id } = req.body;
      const resultInserted = await UserModel.create(users_credentials_id);
      if (!resultInserted.success) {
        const error = new CustomError('Error al insertar user', 500);
        throw error;
      }
      res.status(201).json('creado exitosamente');
    } catch (error) {
      next(error);
    }
  }

  static async obtenerDatos(req: Request, res: Response, next: NextFunction) {
    try {
      const resultdata = await UserModel.getAll();
      if (!resultdata.success) {
        const error = new CustomError('Error al traer datos', 404);
        throw error;
      }
      res.status(200).json(resultdata.data);
    } catch (error) {
      next(error);
    }
  }

  static async getIdUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const idData = await UserModel.getUserId(id);
      if (!idData.success) {
        const error = new CustomError('Error al traer datos', 404);
        throw error;
      }
      res.status(200).json(idData.idGet);
    } catch (error) {
      next(error);
    }
  }

  static async deleteIdUser(req: Request, res: Response, next: NextFunction) {
    try {
      const idDelete = Number(req.params.id);
      const idDataDelete = await UserModel.deleteUserId(idDelete);
      if (!idDataDelete.success) {
        const error = new CustomError('Error al eliminar el id ', 404);
        throw error;
      }
    } catch (error) {
      next(error);
    }
  }
}
