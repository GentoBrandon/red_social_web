import {User, UserModel} from '../../person/models/userModel';

export default class UserServices {
    static async createUser(id: User){
        try {
            const user = await UserModel.insertUser(id);
            if(!user){
                return {
                    success : false
                }
            }
            return {
                success : true
            }
        } catch (error) {
            throw {
                message : (error as Error).message,
                stack: (error as Error).stack
            }
        }
    }

    static async getAllUsers(){
        try {
            const users = await UserModel.getUserAll();
            if(!users){
                return {
                    success: false
                }
            }
            return {
                success: true,
                data: users
            } 
        } catch (error) {
            throw {
                message: (error as Error).message,
                stack: (error as Error).stack
            }
            
        }
    }

    
  static async getUserId(id: number) {
    try {
      const searchId = await UserModel.getUserById(id);
      if (!searchId) {
        return {
          success: false,
        };
      }
      return {
        success: true,
        idGet: searchId,
      };
    } catch (error) {
      throw {
        message: (error as Error).message,
        stack: (error as Error).stack,
      };
    }
  }

    static async deleteUserId(id: number) {
    try {
       const searchId = await UserModel.getUserById(id);
        if(!searchId) {
            return {
                success: false
            }
        }
      const getUserId = await UserModel.deleteUserId(id);
      if (getUserId === 0) {
        return {
          success: false
        };
      }
      return {
        success: true
      };
    } catch (error) {
      throw {
        message: (error as Error).message,
        stack: (error as Error).stack,
      };
    }
  }
}

