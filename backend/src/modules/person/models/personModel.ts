import db from '../../../config/dbConfig';

interface person {
  first_name: string;
  last_name: string;
  birth_date: Date;
  email: string;
}

export class PersonModel {
  private static table = 'persons';
  static async createPerson(person: person) {
    try {
      const resultInsert = await db(this.table).insert(person).returning('id');
      if (!resultInsert) {
        console.log('error create Person');
        return {
          success: false,
        };
      }
      console.log('Person created successfully');
      return {
        success: true,
        id: resultInsert[0],
      };
    } catch (error) {
      console.log('error in create Person');
      throw {
        message: 'Error creating person',
        stack: (error as Error).stack,
      };
    }
  }

  static async getAllPersons() {
    try {
      const resultFound = await db(this.table).select('*');
      if (!resultFound) {
        console.log('Error getting person');
        return {
          success: false,
        };
      }
      console.log('Get all persons Successfully');
      return {
        success: true,
        data: resultFound || [],
      };
    } catch (error) {
      console.log('Error getting person in server');
      throw {
        message: 'Error getting person',
        stack: (error as Error).stack,
      };
    }
  }
  static async updatePerson(id: number, person: person) {
    try {
      const resulFound = await this.getPersonById(id);
      if (!resulFound.success) {
        return {
          success: false,
          message: 'Person not found',
        };
      } else {
        const resultUpdate = await db(this.table)
          .where('id', id)
          .update(person);
        if (!resultUpdate) {
          return {
            success: false,
          };
        }
        return {
          success: true,
        };
      }
    } catch (error) {
      throw {
        message: 'Error updating person in server',
        stack: (error as Error).stack,
      };
    }
  }
  static async getPersonById(id: number) {
    try {
      const resultFound = await db(this.table).where('id', id).select('*');
      if (!resultFound) {
        return {
          success: false,
        };
      }
      if (resultFound.length === 0) {
        return {
          success: false,
        };
      }
      return {
        success: true,
        data: resultFound,
      };
    } catch (error) {
      throw {
        message: 'Error getting person by id',
        stack: (error as Error).stack,
      };
    }
  }
  static async deletePerson(id: number) {
    try {
      const resultDelete = await db(this.table).where('id', id).del();
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
        menubar: 'Error deleting person',
        stack: (error as Error).stack,
      };
    }
  }
}
