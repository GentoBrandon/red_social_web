import { Profile, ProfileModel } from '../models/profileModel';

export default class ProfileServices {
  static async profileGetAllServices() {
    try {
      const resultData = await ProfileModel.profileGetAll();
      if (!resultData) {
        return {
          success: false,
        };
      }

      return {
        success: true,
        data: resultData,
      };
    } catch (error) {
      throw {
        message: (error as Error).message,
        stack: (error as Error).stack,
      };
    }
  }

  static async profileGetIdService(id: number) {
    try {
      const resultId = await ProfileModel.profileIdGet(id);
      if (!resultId) {
        return {
          success: false,
        };
      }

      return {
        success: true,
        data: resultId,
      };
    } catch (error) {
      throw {
        message: (error as Error).message,
        stack: (error as Error).stack,
      };
    }
  }

  static async profileDeleteIdServices(id: number) {
    try {
      const getId = await ProfileModel.profileIdGet(id);
      if (!getId) {
        return {
          success: false,
        };
      }
      const resultDeleted = await ProfileModel.profileDelete(id);
      if (resultDeleted === 0) {
        return {
          success: false,
        };
      }
      return {
        success: true,
      };
    } catch (error) {
      throw {
        message: (error as Error).message,
        stack: (error as Error).stack,
      };
    }
  }

  static async profileUpdateService(id: number, data: Profile) {
    try {
      const existingProfile = await ProfileModel.profileIdGet(id);
      if (!existingProfile) {
        return {
          success: false,
        };
      }

      const updateResult = await ProfileModel.profileUpdate(id, data);
      if (updateResult === 0) {
        return {
          success: false,
        };
      }
      return {
        success: true,
        data: await ProfileModel.profileIdGet(id),
      };
    } catch (error) {
      throw {
        message: (error as Error).message,
        stack: (error as Error).stack,
      };
    }
  }
}
