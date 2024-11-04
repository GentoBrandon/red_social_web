import db from '../../../config/dbConfig';
import CustomError from '../../../utils/customError';
import BaseModel from '../../../utils/base/Model';
import { Knex } from 'knex';
export interface Profile {
  person_id: number;
  presentation?: string;
  address?: string;
  phone_number?: string;
  job?: string;
}

export class ProfileModel extends BaseModel<Profile> {
  private static profileModelInstance: ProfileModel = new ProfileModel();
  constructor() {
    super('profiles');
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
  
  static async insertWithTransaction(data: Profile,trx: Knex.Transaction): Promise<number[]> {
    if(trx){
      const [{id}] = await trx.insert(data).into('profiles').returning('id');
      return id
    }
    return await this.profileModelInstance.insert(data);
  }
}
