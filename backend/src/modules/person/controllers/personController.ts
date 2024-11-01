import { PersonService } from '../service/personService';
import { Request, Response, NextFunction } from 'express';
import CustomError from '../../../utils/customError';
import { validationResult } from 'express-validator';
export default class PersonController {
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
      const resultUpdate = await PersonService.updatePerson(idPerson, req.body);
      if (!resultUpdate.success) {
        const error = new CustomError('Error updating person', 500);
        throw error;
      }
      res.status(200).json({ message: 'Person updated successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async getPerson(req: Request, res: Response, next: NextFunction) {
    try {
      const resultFound = await PersonService.getAllPersons();
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
      const resultFound = await PersonService.getPersonById(idPerson);
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
      const resultDelete = await PersonService.deletePerson(idPerson);
      if (!resultDelete.success) {
        const error = new CustomError('Person not found ', 404);
        throw error;
      }
      res.status(200).json({ message: 'Person deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
  /*
  static async findPersonByName(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { name } = req.params;
      const resultFound = await PersonService.findByName(name);
      if (!resultFound.success) {
        const error = new CustomError('Person not found', 404);
        throw error;
      }
      res.status(200).json(resultFound.data);
    } catch (error) {
      next(error);
    }
  }*/
}
