import db from '../../../config/dbConfig';
import BaseModel from '../../../utils/base/Model';

export interface UserCredentials {
  person_id: number;
  user_name: string;
  password: string;
}

export class UserCredentialModel extends BaseModel<UserCredentials> {
  private static instancie: UserCredentialModel = new UserCredentialModel();
  constructor(){
    super('users_credentials');
  }

  static async create(data: UserCredentials): Promise<number[]>{
    return await this.instancie.insert(data);
  }
  static async getAll(): Promise<UserCredentials[]>{
    return await this.instancie.getAll();
  }
  static async find(id: number): Promise<UserCredentials>{
    return await this.instancie.find(id);
  }
  static async update(id: number, data: UserCredentials): Promise<number>{
    return await this.instancie.update(id, data);
  }
  static async delete(id: number): Promise<number>{
    return await this.instancie.delete(id);
  }

}
