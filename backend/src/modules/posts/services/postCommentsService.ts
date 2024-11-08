import { PostComments, PostComentsModel } from '../models/postCommentModel';

export default class PostCommentsService {
  static async insertCommentService(postComments: PostComments) {
    try {
      const resultInsert =
        await PostComentsModel.inserCommentsModel(postComments);
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
      if ((error as any).code === '23503') {
        // Verifica si el error es una violación de clave foránea
        throw {
          message: 'Error creating comment: Invalid profile or post ID',
          stack: (error as Error).stack,
        };
      }
      throw {
        message: 'Error creating comment',
        stack: (error as Error).stack,
      };
    }
  }

  static async getCommentsAllSevice() {
    try {
      const commentsAll = await PostComentsModel.getAllComentsModel();
      if (!commentsAll) {
        return {
          success: false,
        };
      }
      return {
        success: true,
        data: commentsAll,
      };
    } catch (error) {
      throw {
        message: (error as Error).message,
        stack: (error as Error).stack,
      };
    }
  }

  static async deleteCommentService(id: number) {
    try {
      const getId = await PostComentsModel.getIdComentsModel(id);
      if (!getId) {
        return {
          success: false,
        };
      }

      const deleteId = await PostComentsModel.deleteCommentModel(id);
      if (deleteId === 0) {
        return {
          success: false,
        };
      }
      return {
        success: true,
      };
    } catch (error) {
      throw {
        messager: (error as Error).message,
        stack: (error as Error).stack,
      };
    }
  }

  static async countCommentsPostServices(idPost: number) {
    try {
      const resultCount = await PostComentsModel.countCommentsPost(idPost);
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

  static async getCommentsFullNameServices(idPost: number) {
    try {
      const comments = await PostComentsModel.getCommentsByPostFullName(idPost);
      if (!comments || comments.length === 0) {
        return {
          success: false,
          message: 'No comments found for the specified post',
        };
      }
      return { success: true, data: comments };
    } catch (error) {
      throw {
        message: 'Error retrieving comments for the post',
        stack: (error as Error).stack,
      };
    }
  }
}
