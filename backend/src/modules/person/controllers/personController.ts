import { PersonModel } from '../models/personModel';
import { Request, Response, NextFunction } from 'express';
import CustomError from '../../../utils/customError';
import { validationResult } from 'express-validator';
export default class PersonController {
  static async createPerson(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new CustomError('Data not accepted', 422);
      error.details = errors.array();
      return next(error);
    }

    try {
      const resultInsert = await PersonModel.createPerson(req.body);
      if (!resultInsert.success) {
        const error = new CustomError('Error Creating Person', 500);
        throw error;
      }
      res
        .status(201)
        .json({ message: 'Person created successfully', id: resultInsert.id });
    } catch (error) {
      next(error);
    }
  }

  static async updatePerson(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new CustomError('Data not accepted', 422);
      error.details = errors.array();
      return next(error);
    }
    try {
      const { id } = req.params;
      const idPerson = parseInt(id);
      const resultUpdate = await PersonModel.updatePerson(idPerson, req.body);
      if (!resultUpdate.success) {
        const error = new CustomError(resultUpdate.message || "Error updating person", 500);
        throw error;
      }
      res.status(200).json({ message: 'Person updated successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async getPerson(req: Request, res: Response, next: NextFunction) {
    try {
      const resultFound = await PersonModel.getAllPersons();
      if (!resultFound.success) {
        const error = new CustomError('Error while getting Persons', 404);
        throw error;
      }
      if (resultFound.data?.length === 0) {
        const error = new CustomError('Persons Data empty', 404);
        throw error;
      }
      res.status(200).json(resultFound.data);
    } catch (error) {
      next(error);
    }
  }

  static async getPersonById(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new CustomError('Data not accepted', 422);
      error.details = errors.array();
      return next(error);
    }
    try {
      const { id } = req.params;
      const idPerson = parseInt(id);
      const resultFound = await PersonModel.getPersonById(idPerson);
      if (!resultFound.success) {
        const error = new CustomError('Error get Person', 404);
        throw error;
      }
      res.status(200).json(resultFound.data);
    } catch (error) {
      next(error);
    }
  }

  static async deletePerson(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new CustomError('Data not accepted', 422);
      error.details = errors.array();
      return next(error);
    }
    try {
      const { id } = req.params;
      const idPerson = parseInt(id);
      const resultDelete = await PersonModel.deletePerson(idPerson);
      if (!resultDelete.success) {
        const error = new CustomError('Person not found ', 404);
        throw error;
      }
      res.status(200).json({ message: 'Person deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}
