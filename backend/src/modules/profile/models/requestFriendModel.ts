import BaseModel from '../../../utils/base/Model';

export interface RequestFriend {
  id_profile_request: number;
  id_profile_response: number;
  id_status: number;
}

export class RequestFriendModel extends BaseModel<RequestFriend> {
  private static instance: RequestFriendModel = new RequestFriendModel();
  constructor() {
    super('request_friends');
  }
  static async insertRequestFriend(
    requestFriend: RequestFriend,
  ): Promise<number[]> {
    return this.instance.insert(requestFriend);
  }
  static async getRequestFriendAll(): Promise<RequestFriend[]> {
    return this.instance.getAll();
  }
  static async getRequestFriendById(id: number): Promise<RequestFriend> {
    return this.instance.find(id);
  }
  static async updateRequestFriend(
    id: number,
    requestFriend: RequestFriend,
  ): Promise<number> {
    return this.instance.update(id, requestFriend);
  }
  static async deleteRequestFriend(id: number): Promise<number> {
    return this.instance.delete(id);
  }
}
