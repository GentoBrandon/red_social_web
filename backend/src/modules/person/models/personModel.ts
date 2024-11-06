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
  static async create(person: Person): Promise<number[]> {
    return this.instance.insert(person);
  }
  static async getAll(): Promise<Person[]> {
    return this.instance.getAll();
  }
  static async find(id: number): Promise<Person> {
    return this.instance.find(id);
  }
  static async update(id: number, person: Person): Promise<number> {
    return this.instance.update(id, person);
  }
  static async delete(id: number): Promise<number> {
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
  static async getNamePersonById(
    id: number,
  ): Promise<{ first_name: string; last_name: string } | null> {
    const result = await db(this.instance.table)
      .where({ id })
      .select('first_name', 'last_name')
      .first(); // Esto asegura que obtienes solo un objeto, no un array

    return result || null;
  }

  static async findPersonByName(name: string): Promise<Person[]> {
    return db(this.instance.table)
      .where('first_name', 'ilike', `%${name}%`)
      .orWhere('last_name', 'ilike', `%${name}%`)
      .select('id', 'first_name', 'last_name');
  }
}
