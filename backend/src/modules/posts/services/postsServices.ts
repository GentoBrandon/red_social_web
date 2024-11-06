import { Posts, PostsModel } from '../models/potsModel';

export default class PostsServices {
  static async createPostsServices(posts: Posts) {
    try {
      const resultInsert = await PostsModel.insertPosts(posts);
      if (!resultInsert) {
        return {
          success: false,
        };
      }
      return {
        success: true,
        data: resultInsert[0],
      };
    } catch (error) {
      throw {
        message: 'Error creating posts',
        stack: (error as Error).stack,
      };
    }
  }

  static async postsGetAllServices() {
    try {
      const resultData = await PostsModel.getAllPosts();
      if (!resultData) {
        return {
          success: false,
        };
      }
      return {
        success: true,
        data: resultData
      };
    } catch (error) {
      throw {
        message: (error as Error).message,
        stack: (error as Error).stack,
      };
    }
  }

  static async postsGetIdService(id: number) {
    try {
      const getIdPost = await PostsModel.getPostsId(id);
      if (!getIdPost) {
        return {
          success: false,
        };
      }
      return {
        success: true,
        data: getIdPost,
      };
    } catch (error) {
      throw {
        message: (error as Error).message,
        stack: (error as Error).stack,
      };
    }
  }

  static async deleteIdPost(id: number) {
    try {
      const getId = await PostsModel.getPostsId(id);
      if(!getId) {
        return {
          success: false
        }
      }
      const delId = await PostsModel.deletePost(id);
      if (delId === 0) {
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

  static async updatePostsService(id: number, posts: Posts) {
    try {
      const resultUpdate = await PostsModel.updatePosts(id, posts);
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
        message: 'Error updating posts',
        stack: (error as Error).stack,
      };
    }
  }

  static async getAllPostsProfileId(id_profile: number) {
    try {
      const resultData = await PostsModel.getAllPostsProfile(id_profile);
      if (!resultData) {
        return {
          success: false,
        };
      }
      return {
        success: true,
        data: resultData
      };
    } catch (error) {
      throw {
        message: (error as Error).message,
        stack: (error as Error).stack,
      };
    }
  }
}
