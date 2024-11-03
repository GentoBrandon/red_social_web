import db from '../../config/dbConfig';
export default class BaseModel<T> {
  protected table: string;
  constructor(table: string) {
    this.table = table;
  }
  async insert(data: T): Promise<number[]> {
    return await db(this.table).insert(data).returning('id');
  }
  async getAll(): Promise<T[]> {
    return await db(this.table).select('*');
  }
  async find(id: number): Promise<T> {
    return await db(this.table).where('id', id).select('*').first();
  }
  async update(id: number, data: T): Promise<number> {
    return await db(this.table).where('id', id).update(data);
  }
  async delete(id: number): Promise<number> {
    return await db(this.table).where('id', id).delete();
  }
}
