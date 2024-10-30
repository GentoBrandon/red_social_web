import db from '../../../config/dbConfig';
import CustomError from '../../../utils/customError';
interface Profile {
  person_id?: number;
  presentation: string;
  address: string;
  phone_number: string;
  job_id: number,
  university_id: number,
}
export default class ProfileModel {
  private static table: string = 'profiles';

  private static async _findById(id: number) {
    try {
      return await db(this.table).where({ id }).select('*').first();
    } catch (error) {
      throw {
        message: (error as Error).message,
        stack: (error as Error).stack,
      };
    }
  }
  static async create(profile: Profile) {
    try {
      // Validación previa de datos requeridos
      if (!profile.person_id) {
        throw new CustomError("El campo 'person_id' es obligatorio y no puede ser null",500);
    }
      const resultInsert = await db(this.table).insert(profile);
      if (!resultInsert) {
        return {
          success: false,
        };
      }
      return {
        success: true,
      };
    } catch (error) {
      throw {
        message: (error as Error).message,
        stack: (error as Error).stack,
      };
    }
  }
  static async getAll() {
    try {
      const resulData = await db(this.table).select('*');
      if (resulData.length === 0) {
        return {
          success: false,
        };
      }
      return {
        success: true,
        data: resulData,
      };
    } catch (error) {
      throw {
        message: (error as Error).message,
        stack: (error as Error).stack,
        details: (error as CustomError).details
      };
    }
  }

  static async findById(id: number) {
    try {
      const resultFound = await this._findById(id);
      if (!resultFound) {
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
        message: (error as Error).message,
        stack: (error as Error).stack,
      };
    }
  }

  static async update(id: number, profile: Profile) {
    const isProfileExist = await this._findById(id);
    if (!isProfileExist) {
      return {
        success: false,
        message: 'profile not found',
      };
    }
    try {
      const resultUpdated = await db(this.table).where({ id }).update(profile);
      if (!resultUpdated) {
        return {
          success: false,
        };
      }
      return {
        success: true,
      };
    } catch (error) {
      throw {
        message: (error as Error).message,
        stack: (error as Error).stack,
      };
    }
  }
  static async delete(id: number) {
    const isProfileExist = await this._findById(id);
    if (!isProfileExist) {
      return {
        success: false,
        message: 'profile not found',
      };
    }

    try {
      const resultDeleted = await db(this.table).where({ id }).del();
      if (!resultDeleted) {
        return {
          success: false,
        };
      }
      return {
        success: true,
      };
    } catch (error) {
      throw {
        message: (error as Error).message,
        stack: (error as Error).stack,
      };
    }
  }
}
