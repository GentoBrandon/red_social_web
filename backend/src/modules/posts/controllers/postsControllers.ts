import CustomError from '../../../utils/customError';
import postsServices from '../services/postsServices';
import { Request, Response, NextFunction } from 'express';

export default class PostsController {
  static async createPostController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id_profile, description, content } = req.body;
      const postData = { id_profile, description, content };
      const resultInsert = await postsServices.createPostsServices(postData);
      if (!resultInsert.success) {
        const error = new CustomError('Error creating post', 400);
        throw error;
      }
      res.status(201).json({ message: 'Post created successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async getAllPostsController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const resultFound = await postsServices.postsGetAllServices();
      if (!resultFound.success) {
        const error = new CustomError('Error while getting posts', 404);
        throw error;
      }
      if (resultFound.data?.length === 0) {
        const error = new CustomError('Posts Data empty', 404);
        throw error;
      }
      res.status(200).json(resultFound.data);
    } catch (error) {
      next(error);
    }
  }

  static async getPostIdController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const idGet = parseInt(id);
      const resultData = await postsServices.postsGetIdService(idGet);
      if(!resultData.success){
        const error = new CustomError('Error get post', 404);
        throw error;
      }
      res.status(200).json(resultData.data);
    } catch (error) {
      next(error);
    }
  }

  static async deleteIdPostController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const idDelete = parseInt(id);
      const resultDelete = await postsServices.deleteIdPost(idDelete);
      if(!resultDelete){
        const error = new CustomError('Error delete post', 404);
        throw error;
      }
      res.status(200).json({message: 'Post delete successfully'});
    } catch (error) {
      next(error);
    }
  }

  static async deleteIdPostProfileController(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
      const {id, idProfile} = req.params
      const idDel = parseInt(id);
      const idDelProfile = parseInt(idProfile);
      const resultDelete = await postsServices.deletePostIdProfile(idDel,idDelProfile);
      if(!resultDelete.success){
        const error = new CustomError('Error delete post', 404);
        throw error;
      }
      res.status(200).json({message: 'Post delete successfully'});
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
      const { id_profile, description, content } = req.body;
      const postDataUpdate = { id_profile, description, content };
      const resultUpdate = await postsServices.updatePostsService(
        _id,
        postDataUpdate,
      );
      if (!resultUpdate.success) {
        const error = new CustomError('Error post update', 400);
        throw error;
      }
      res.status(201).json({ message: 'Post update successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async getAllPostsByProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const idProfile = parseInt(id);
      const resultFound = await postsServices.getAllPostsProfileId(idProfile);
      if (!resultFound.success) {
        const error = new CustomError('Error while getting posts', 404);
        throw error;
      }
      if (resultFound.data?.length === 0) {
        const error = new CustomError('Posts Data empty', 404);
        throw error;
      }
      res.status(200).json(resultFound.data);
    } catch (error) {
      next(error);
    }
  }
}
