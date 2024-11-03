import BaseModel from '../../../utils/base/Model';
import db from '../../../config/dbConfig';
export interface FriendStatus {
  id?: number | undefined;
  name_status: string;
}

export default class FriendStatusModel extends BaseModel<FriendStatus> {
  private static instance: FriendStatusModel = new FriendStatusModel();
  constructor() {
    super('friends_status');
  }
  static async insert(FriendStatus: FriendStatus): Promise<number[]> {
    return await this.instance.insert(FriendStatus);
  }
  static async getAll(): Promise<FriendStatus[]> {
    return await this.instance.getAll();
  }
  static async find(id: number): Promise<FriendStatus> {
    return await this.instance.find(id);
  }
  static async update(id: number, friendStatus: FriendStatus): Promise<number> {
    return await this.instance.update(id, friendStatus);
  }
  static async delete(id: number): Promise<number> {
    return await this.instance.delete(id);
  }
  static async findByName(name: string): Promise<FriendStatus> {
    return await db('friend_status').where('name', name).select('*').first();
  }
}
