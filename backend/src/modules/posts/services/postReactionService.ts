import { PostReactions, PostReactionsModel } from '../models/postReactionModel';

export default class PostReactionService {
  static async deleteReactionsIdProfile(id: number, idProfile: number) {
    try {
      const getIdPost = await PostReactionsModel.getPostsReactionsId(id);
      if (!getIdPost) {
        return {
          success: false,
        };
      }
      const resultData = await PostReactionsModel.deletePostsReactionsByProfile(
        id,
        idProfile,
      );
      if (resultData === 0) {
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
  static async insertReactionsPostService(postReactions: PostReactions) {
    try {
      const resultInsert =
        await PostReactionsModel.insertPostsReactions(postReactions);
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
        message: (error as Error).message,
        stack: (error as Error).stack,
      };
    }
  }

  static async countReactionsAllServices(idPost: number) {
    try {
      const resultCount = await PostReactionsModel.countReactionsAll(idPost);
      return {
        success: true,
        data: resultCount,
      };
    } catch (error) {
      throw {
        message: (error as Error).message,
        stack: (error as Error).stack,
      };
    }
  }
}
