import BaseModel from '../../../utils/base/Model';
import { ProfileModel, Profile } from './profileModel';
import db from '../../../config/dbConfig';
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

  static async getAllFriendsByName(id: number): Promise<any[]> {
    const result = await db('request_friends as rf')
      .join('profiles as p_request', 'rf.id_profile_request', 'p_request.id')
      .join('persons as pr_request', 'p_request.person_id', 'pr_request.id')
      .join('profiles as p_response', 'rf.id_profile_response', 'p_response.id')
      .join('persons as pr_response', 'p_response.person_id', 'pr_response.id')
      .where('rf.id_profile_request', id)
      .orWhere('rf.id_profile_response', id)
      .select(
        'pr_request.first_name as requester_first_name',
        'pr_request.last_name as requester_last_name',
        'pr_response.first_name as responder_first_name',
        'pr_response.last_name as responder_last_name',
      );

    return result;
    /*const query = `
    SELECT 
      pr_request.first_name AS requester_first_name,
      pr_request.last_name AS requester_last_name,
      pr_response.first_name AS responder_first_name,
      pr_response.last_name AS responder_last_name
    FROM 
      request_friends rf
    JOIN 
      profiles p_request ON rf.id_profile_request = p_request.id
    JOIN 
      persons pr_request ON p_request.person_id = pr_request.id
    JOIN 
      profiles p_response ON rf.id_profile_response = p_response.id
    JOIN 
      persons pr_response ON p_response.person_id = pr_response.id
    WHERE 
      rf.id_profile_request = ${id} OR rf.id_profile_response = ${id};
  `
  const result = await db.raw(query);
  return result.rows || [];*/
  }
}
