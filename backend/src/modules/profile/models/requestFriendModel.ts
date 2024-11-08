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
  }

  static async searchFriendsByName(
    profileId: number,
    name: string,
  ): Promise<
    {
      profile_id: number;
      first_name: string;
      last_name: string;
      friend_status: string;
    }[]
  > {
    const friends = await db('request_friends')
      .distinct(
        db.raw(
          'CASE WHEN requester.id = ? THEN responder.id ELSE requester.id END as profile_id',
          [profileId],
        ),
        db.raw(
          'CASE WHEN requester.id = ? THEN responder_person.first_name ELSE requester_person.first_name END as first_name',
          [profileId],
        ),
        db.raw(
          'CASE WHEN requester.id = ? THEN responder_person.last_name ELSE requester_person.last_name END as last_name',
          [profileId],
        ),
        'friends_status.name_status as friend_status',
      )
      .join(
        'profiles as requester',
        'request_friends.id_profile_request',
        '=',
        'requester.id',
      )
      .join(
        'profiles as responder',
        'request_friends.id_profile_response',
        '=',
        'responder.id',
      )
      .join(
        'persons as requester_person',
        'requester.person_id',
        '=',
        'requester_person.id',
      )
      .join(
        'persons as responder_person',
        'responder.person_id',
        '=',
        'responder_person.id',
      )
      .join(
        'friends_status',
        'request_friends.id_status',
        '=',
        'friends_status.id',
      )
      .where(function () {
        this.where('requester.id', profileId).orWhere(
          'responder.id',
          profileId,
        );
      })
      .andWhere('friends_status.id', '=', 1) // Filtra solo amigos confirmados
      .andWhere(function () {
        this.where('requester_person.first_name', 'ilike', `%${name}%`)
          .orWhere('requester_person.last_name', 'ilike', `%${name}%`)
          .orWhere('responder_person.first_name', 'ilike', `%${name}%`)
          .orWhere('responder_person.last_name', 'ilike', `%${name}%`);
      });

    return friends;
  }
}
