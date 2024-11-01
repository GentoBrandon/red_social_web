import db from '../../../config/dbConfig';
import { Knex } from 'knex';
import BaseModel from '../../../utils/base/Model';
export interface Person {
  first_name: string;
  last_name: string;
  birth_date: Date;
  email: string;
}

export class PersonModel extends BaseModel<Person> {
  private static instance: PersonModel = new PersonModel();
  constructor() {
    super('persons');
  }
  static async create(person: Person) {
    return this.instance.insert(person);
  }
  static async getAll() {
    return this.instance.getAll();
  }
  static async find(id: number) {
    return this.instance.find(id);
  }
  static async update(id: number, person: Person) {
    return this.instance.update(id, person);
  }
  static async delete(id: number) {
    return this.instance.delete(id);
  }
  static async insertWithTransaction(
    person: Person,
    trx?: null | Knex.Transaction,
  ): Promise<number> {
    if (trx) {
      const [{ id }] = await trx(this.instance.table)
        .insert(person)
        .returning('id');
      return id;
    }
    const [id] = await this.instance.insert(person);
    return id;
  }
}
