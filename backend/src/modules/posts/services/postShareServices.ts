import { Posts_Share, PostShareModel } from '../models/postShareModel';
import { ProfileModel } from '../../profile/models/profileModel';
export default class PostShareServices {
  static async createPostShareService(post_share: Posts_Share) {
    try {
      const resultPostShare = await PostShareModel.insertPostShare(post_share);
      if (!resultPostShare) {
        return {
          success: false,
        };
      }
      return {
        success: true,
        data: resultPostShare,
      };
    } catch (error) {
      throw {
        message: 'Error creating posts',
        stack: (error as Error).stack,
      };
    }
  }

  static async getAllPostShareService() {
    try {
      const resultData = await PostShareModel.getAllPostShare();
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

  static async getAllPostShareIdService(id: number) {
    try {
      const idData = await PostShareModel.getPostShareId(id);
      if (!idData) {
        return {
          success: false,
        };
      }
      return {
        success: true,
        data: idData,
      };
    } catch (error) {
      throw {
        message: (error as Error).message,
        stack: (error as Error).stack,
      };
    }
  }

  static async getPostShareDeleteService(id: number) {
    try {
      const idGet = await PostShareModel.getPostShareId(id);
      if (!idGet) {
        return {
          success: false,
        };
      }

      const idDelete = await PostShareModel.deletePostShare(id);
      if (idDelete === 0) {
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

  static async updatePostShareService(id: number, post_share: Posts_Share) {
    try {
      const resultUpdate = await PostShareModel.updatePostShare(id, post_share);
      if (!resultUpdate) {
        return {
          success: false,
        };
      }
      return {
        success: true,
        data: resultUpdate,
      };
    } catch (error) {
      throw {
        message: (error as Error).message,
        stack: (error as Error).stack,
      };
    }
  }
  static async getAllPostsShareAndPostOriginalByProfileIdService(id_profile: number) {
    try {

      const result = await PostShareModel.getAllPostsShareAndPostOriginalByProfileId(id_profile);
      if (result.length === 0) {
        return {
          success: false
        }
      }
      return {
        success: true,
        data: result
      }
    } catch (error) {
      throw{
        message: (error as Error).message,
        stack: (error as Error).stack
      }
    }
  }
}
