import PostCommentsService from '../services/postCommentsService';
import { Request, Response, NextFunction } from 'express';
import CustomError from '../../../utils/customError';
export default class PostComentsController {
  static async insertComentsController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id_profile, id_post, comment } = req.body;
      const postData = { id_profile, id_post, comment };
      const resultInsert =
        await PostCommentsService.insertCommentService(postData);
      if (!resultInsert.success) {
        const error = new CustomError('Error creating comment', 400);
        throw error;
      }
      res.status(201).json({ message: 'comment created successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async getCommentsControllerAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const resultData = await PostCommentsService.getCommentsAllSevice();
      if (!resultData.success) {
        const error = new CustomError('Error while getting comments', 404);
        throw error;
      }

      if (resultData.data?.length === 0) {
        const error = new CustomError('comments Data empty', 404);
        throw error;
      }
      res.status(201).json(resultData);
    } catch (error) {
      next(error);
    }
  }

  static async deleteCommentsIdController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const deleteId = parseInt(id);
      const resultDelete =
        await PostCommentsService.deleteCommentService(deleteId);
      if (!resultDelete.success) {
        const error = new CustomError('Error delete comment', 404);
        throw error;
      }
      res.status(200).json({ message: 'comments deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async countCommentsPostController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { idPost } = req.params;
      const countIdPost = parseInt(idPost, 10);
      const resultCount =
        await PostCommentsService.countCommentsPostServices(countIdPost);
      if (!resultCount.success) {
        const error = new CustomError('Error counting comments', 400);
        throw error;
      }
      res.status(200).json(resultCount.data);
    } catch (error) {
      next(error);
    }
  }

  static async getCommentsByPostController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { idPost } = req.params;
      const getId = parseInt(idPost, 10);
      const result =
        await PostCommentsService.getCommentsFullNameServices(getId);
      if (!result.success) {
        const error = new CustomError('No comments found', 404);
        throw error;
      }
      // Respuesta con los comentarios
      res.status(200).json({ success: true, data: result.data });
    } catch (error) {
      next(error);
    }
  }

  static async getPostWithCommentsController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const idPost = Number(req.params.idPost);

      // Validación del parámetro idPost
      if (isNaN(idPost)) {
        throw new CustomError('Invalid post ID', 400);
      }

      // Llamada al servicio
      const result = await PostCommentsService.getPostWithComments(idPost);

      // Manejo del resultado
      if (!result.success) {
        throw new CustomError(result.message || 'Post not found', 404);
      }

      res.status(200).json({
        success: true,
        data: result.data,
      });
    } catch (error) {
      next(error);
    }
  }
}
