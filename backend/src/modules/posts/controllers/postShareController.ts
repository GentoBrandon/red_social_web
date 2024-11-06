import postshareServices from '../services/postShareServices';
import { Request, Response, NextFunction } from 'express';
import CustomError from '../../../utils/customError';

export default class PostShareController {
  static async createPostShareController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id_profile, id_post, description } = req.body;
      const dataPostShare = { id_profile, id_post, description };
      const resultInsert =
        await postshareServices.createPostShareService(dataPostShare);
      if (!resultInsert.success) {
        const error = new CustomError('Error creating shared post', 400);
        throw error;
      }
      res.status(201).json({ message: 'shared post created successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async getAllPostShareController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const getAllPostShare = await postshareServices.getAllPostShareService();
      if (!getAllPostShare.success) {
        const error = new CustomError('Error while getting post share', 404);
        throw error;
      }
      if (getAllPostShare.data?.length === 0) {
        const error = new CustomError('PostShare Data empty', 404);
        throw error;
      }
      res.status(200).send(getAllPostShare.data);
    } catch (error) {
      next(error);
    }
  }

  static async getPostShareIdController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const idGet = parseInt(id);
      const resultData =
        await postshareServices.getAllPostShareIdService(idGet);
      if (!resultData.success) {
        const error = new CustomError('Error get post', 404);
        throw error;
      }
      res.status(200).json(resultData.data);
    } catch (error) {
      next(error);
    }
  }

  static async deleteIdPostShareController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const idDelete = parseInt(id);
      const resultDelete =
        await postshareServices.getPostShareDeleteService(idDelete);
      if (!resultDelete) {
        const error = new CustomError('Error delete post share', 404);
        throw error;
      }
      res.status(200).json({ message: 'Post share delete successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async updatePostController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const _id = parseInt(id);
      const { id_profile, id_post, description } = req.body;
      const postDataUpdate = { id_profile, id_post, description };
      const resultUpdate = await postshareServices.updatePostShareService(
        _id,
        postDataUpdate,
      );
      if (!resultUpdate.success) {
        const error = new CustomError('Error post share update', 400);
        throw error;
      }
      res.status(201).json({ message: 'Post share update successfully' });
    } catch (error) {
      next(error);
    }
  }
}
