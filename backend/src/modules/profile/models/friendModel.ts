import BaseModel from "../../../utils/base/Model";
import db from "../../../config/dbConfig"
import {Knex} from "knex"
export interface Friend{
    id?: number,
    request_friend_id: number
}

export class FriendModel extends BaseModel<Friend>{
    private static instance: FriendModel = new FriendModel
    constructor(){
        super('friends');
    }
    static async insert(friend: Friend): Promise<number[]>{
        return await this.instance.insert(friend)
    }
    static async getAll(): Promise<Friend[]>{
        return await this.instance.getAll()
    }
    static async find(id: number): Promise<Friend>{
        return await this.instance.find(id)
    }
    static async update(id: number, friend: Friend): Promise<number>{
        return await this.instance.update(id, friend)
    }
    static async delete(id: number): Promise<number>{
        return await this.instance.delete(id)
    }
    static async insertWithTransaction(friend:Friend){
        const result = db.transaction(async (trx) => {
            
        })
       
    }
}