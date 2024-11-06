import postReactionService from '../services/postReactionService';
import { Request, Response, NextFunction } from 'express';
import CustomError from '../../../utils/customError';
import PostReactionService from '../services/postReactionService';
export default class PostReactionsController {
  static async deleteIdReactionsController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id, idProfile } = req.params;
      const idDel = parseInt(id);
      const idDelProfile = parseInt(idProfile);
      const resultDelete = await postReactionService.deleteReactionsIdProfile(
        idDel,
        idDelProfile,
      );
      if (!resultDelete.success) {
        const error = new CustomError('Error delete reactions', 404);
        throw error;
      }
      res.status(200).json({ message: 'reactions delete successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async insertReactionsPostController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id_post, id_profile, reactions } = req.body;
      const postData = { id_post, id_profile, reactions };
      const resultInsert =
        await PostReactionService.insertReactionsPostService(postData);
      if (!resultInsert.success) {
        const error = new CustomError('Error creating reactions', 400);
        throw error;
      }
      res.status(201).json({ message: 'reactions created successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async countReactionsAllController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
        const { idPost } = req.params;
        const countIdPost = parseInt(idPost, 10);
        const resultCount = await PostReactionService.countReactionsAllServices(countIdPost);
        if(!resultCount.success) {
            const error = new CustomError('Error counting reactions', 400);
            throw error;
        }
        res.status(200).json(resultCount.data);
    } catch (error) {}
  }
}
