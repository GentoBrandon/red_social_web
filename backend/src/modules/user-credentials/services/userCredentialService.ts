import { getDefaultResultOrder } from 'dns';
import {
  UserCredentialModel,
  UserCredentials,
} from '../models/userCredentiaModel';

export class UserCredentialsService {
  static async createUserCredential(userCredential: UserCredentials) {
    try {
      const resultInsert = await UserCredentialModel.create(userCredential);
      if (!resultInsert) {
        return {
          success: false,
        };
      }
      return {
        success: true,
      };
    } catch (error) {
      throw {
        message: 'Error while creating user credential',
        stacK: (error as Error).stack,
      };
    }
  }
  static async getallUserCredentials() {
    try {
      const resultGetAll = await UserCredentialModel.getAll();
      if (!resultGetAll) {
        return {
          success: false,
        };
      }
      return {
        success: true,
        data: resultGetAll,
      };
    } catch (error) {
      throw {
        message: 'Error while getting all user credentials',
        stack: (error as Error).stack,
      };
    }
  }
  static async findUserCredential(id: number) {
    try {
      const resultFind = await UserCredentialModel.find(id);
      if (!resultFind) {
        return {
          success: false,
        };
      }
      return {
        success: true,
        data: resultFind,
      };
    } catch (error) {
      throw {
        message: 'Error while finding user credential',
        stack: (error as Error).stack,
      };
    }
  }
  static async updateUserCredential(
    id: number,
    userCredential: UserCredentials,
  ) {
    try {
      const resultUpdate = await UserCredentialModel.update(id, userCredential);
      if (!resultUpdate) {
        return {
          success: false,
        };
      }
      return {
        success: true,
      };
    } catch (error) {
      throw {
        message: 'Error while updating user credential',
        stack: (error as Error).stack,
      };
    }
  }
  static async deletedUserCredential(id: number) {
    try {
      const resultDelete = await UserCredentialModel.delete(id);
      if (!resultDelete) {
        return {
          success: false,
        };
      }
      return {
        success: true,
      };
    } catch (error) {
      throw {
        message: 'Error while deleting user credential',
        stack: (error as Error).stack,
      };
    }
  }
  static async findUserCredentialByUserName(user_name: string) {
    try {
      const resultFind = await UserCredentialModel.findByUserName(user_name);
      if (!resultFind) {
        return {
          success: false,
          data: resultFind || '',
        };
      }
      return {
        success: true,
        data: resultFind || '',
      };
    } catch (error) {
      throw {
        message: 'Error while finding user credential by username',
        stack: (error as Error).stack,
      };
    }
  }
}
