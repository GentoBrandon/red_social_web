import db from '../../../config/dbConfig';

interface UserCredentials {
  person_id: number;
  user_name: string;
  password: string;
}

export default class UserCredentialsModel {
  private static table: string = 'users_credentials';
  static async create(users_credentials: UserCredentials) {
    try {
      const resultInsert = await db(this.table)
        .insert(users_credentials)
        .returning('id');
      if (!resultInsert) {
        return {
          success: false,
        };
      }
      return {
        success: true,
        id: resultInsert[0],
      };
    } catch (error) {
      return {
       
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
        message: 'Error to get all data',
        stack: (error as Error).stack,
      };
    }
  }
}
