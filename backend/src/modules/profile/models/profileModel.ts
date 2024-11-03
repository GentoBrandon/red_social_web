import db from '../../../config/dbConfig';
import CustomError from '../../../utils/customError';
import BaseModel from '../../../utils/base/Model';

export interface Profile {
  person_id?: number;
  presentation: string;
  address: string;
  phone_number: string;
  job_id: number;
  university_id: number;
}

export class ProfileModel extends BaseModel<Profile> {
  private static profileModelInstance: ProfileModel = new ProfileModel();
  constructor() {
    super('profile');
  }

  static async profileGetAll(): Promise<Profile[]> {
    return await this.profileModelInstance.getAll();
  }

  static async profileIdGet(id: number): Promise<Profile> {
    return await this.profileModelInstance.find(id);
  }

  static async profileDelete(id: number): Promise<Number> {
    return await this.profileModelInstance.delete(id);
  }

  static async profileUpdate(id: number, data: Profile): Promise<number> {
    return await this.profileModelInstance.update(id, data);
  }
}
