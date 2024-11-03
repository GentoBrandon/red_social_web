import db from '../../../config/dbConfig';
import {Knex} from 'knex'
import BaseModel from '../../../utils/base/Model';
// interface 
export interface User{
    users_credentiasl_id : number
}
export class UserModel extends BaseModel<User>{
    private static userModelInstance : UserModel = new UserModel();
    constructor(){
        super("users");
    }
    static async insertUser (id : User):Promise<number[]>{
        return await this.userModelInstance.insert(id);
    }
    static async getUserAll ():Promise<User[]>{
        return await this.userModelInstance.getAll();
    }

    static async getUserById (id : number):Promise<User> {
        return await this.userModelInstance.find(id);
    }

    static async deleteUserId (id : number):Promise<Number>{
        return await this.userModelInstance.delete(id);
    }

    static async insertWithTransaction(user: User, trx: Knex.Transaction): Promise<number[]> {
        if(trx){
            const [{id}] = await trx.insert(user).into('users').returning('id');
            return id;
        }
        const id = await this.insertUser(user);
        return id;
}
}


