import db from '../../../config/dbConfig';
import BaseModel from '../../../utils/base/Model';
import { Knex } from 'knex';
export interface UserCredentials {
  person_id?: number;
  user_name: string;
  password: string;
}

export class UserCredentialModel extends BaseModel<UserCredentials> {
  private static instancie: UserCredentialModel = new UserCredentialModel();
  constructor() {
    super('users_credentials');
  }

  static async create(data: UserCredentials): Promise<number[]> {
    return await this.instancie.insert(data);
  }
  static async getAll(): Promise<UserCredentials[]> {
    return await this.instancie.getAll();
  }
  static async find(id: number): Promise<UserCredentials> {
    return await this.instancie.find(id);
  }
  static async update(id: number, data: UserCredentials): Promise<number> {
    return await this.instancie.update(id, data);
  }
  static async delete(id: number): Promise<number> {
    return await this.instancie.delete(id);
  }
  static async insertWithTransaction(
    data: UserCredentials,
    trx?: null | Knex.Transaction,
  ): Promise<number> {
    if (trx) {
      const [{ id }] = await trx
        .insert(data)
        .into('users_credentials')
        .returning('id');
      return id;
    }
    const [id] = await this.create(data);
    return id;
  }
  static async findByUserName(user_name: string): Promise<UserCredentials> {
    return await db('users_credentials').where({ user_name }).first();
  }
}
