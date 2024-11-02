import db from '../../../config/dbConfig';
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
    static async insertUser (id : User):Promise<Number[]>{
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
}


// export class UserModel {
//   private static table: string = 'users';
//   static async create(user: number) {
//     try {
//       const resultInsert = await db(this.table)
//         .insert({ users_credentiasl_id: user })
//         .returning('id');
//       if (!resultInsert) {
//         return {
//           success: false,
//         };
//       }
//       return {
//         success: true,
//       };
//     } catch (error) {
//       throw {
//         message: (error as Error).message,
//         stack: (error as Error).stack,
//       };
//     }
//   }

//   static async getAll() {
//     try {
//       const obtenerDatos = await db(this.table).select('*');
//       if (obtenerDatos.length === 0) {
//         return {
//           sucess: false,
//         };
//       }

//       return {
//         success: true,
//         data: obtenerDatos,
//       };
//     } catch (error) {
//       throw {
//         message: (error as Error).message,
//         stack: (error as Error).stack,
//       };
//     }
//   }

//   static async getUserId(id: number) {
//     try {
//       const buscarDatos = await db(this.table).where('id', id).select().first();
//       if (!buscarDatos) {
//         return {
//           success: false,
//         };
//       }
//       return {
//         success: true,
//         idGet: buscarDatos,
//       };
//     } catch (error) {
//       throw {
//         message: (error as Error).message,
//         stack: (error as Error).stack,
//       };
//     }
//   }

//   static async deleteUserId(id: number) {
//     try {
//       const getUserId = await db(this.table).where('id', id).select().del();
//       if (!getUserId) {
//         return {
//           success: false,
//         };
//       }

//       return {
//         success: true,
//         idGet: getUserId,
//       };
//     } catch (error) {
//       throw {
//         message: (error as Error).message,
//         stack: (error as Error).stack,
//       };
//     }
//   }
// }
