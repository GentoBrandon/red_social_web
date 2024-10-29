import db from '../../../config/dbConfig';
interface Profile {
  person_id: number;
  title: string;
  address: string;
  phone_number: string;
}
export default class ProfileModel {
  private static table: string = 'profile';
  static async create(profile: Profile) {
    try {
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
}
