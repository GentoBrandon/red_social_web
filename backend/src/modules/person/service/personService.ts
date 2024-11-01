import { Person, PersonModel } from '../models/personModel';

export class PersonService {
  static async createPerson(person: Person) {
    try {
      const resultInsert = await PersonModel.create(person);
      if (!resultInsert) {
        return {
          success: false,
        };
      }
      return {
        success: true,
        data: resultInsert[0],
      };
    } catch (error) {
      throw {
        message: 'Error creating person',
        stack: (error as Error).stack,
      };
    }
  }
  static async getAllPersons() {
    try {
      const resultGetAll = await PersonModel.getAll();
      if (!resultGetAll) {
        return {
          success: false,
        };
      }
      return {
        success: true,
        data: resultGetAll,
      };
    } catch (error) {
      throw {
        message: 'Error getting all persons',
        stack: (error as Error).stack,
      };
    }
  }

  static async getPersonById(id: number) {
    try {
      const resultGetById = await PersonModel.find(id);
      if (!resultGetById) {
        return {
          success: false,
        };
      }
      return {
        success: true,
        data: resultGetById,
      };
    } catch (error) {
      throw {
        message: 'Error getting person by id',
        stack: (error as Error).stack,
      };
    }
  }

  static async updatePerson(id: number, person: Person) {
    try {
      const resultUpdate = await PersonModel.update(id, person);
      if (!resultUpdate) {
        return {
          success: false,
        };
      }
      return {
        success: true,
        data: resultUpdate,
      };
    } catch (error) {
      throw {
        message: 'Error updating person',
        stack: (error as Error).stack,
      };
    }
  }

  static async deletePerson(id: number) {
    try {
      const resultDelete = await PersonModel.delete(id);
      if (!resultDelete) {
        return {
          success: false,
        };
      }
      return {
        success: true,
      };
    } catch (error) {
      throw {
        message: 'Error deleting person',
        stack: (error as Error).stack,
      };
    }
  }
}
