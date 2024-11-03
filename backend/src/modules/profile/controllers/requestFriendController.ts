import requestFriendService from '../services/requestFriendService';
import { Request, Response, NextFunction } from 'express';
import CustomError from '../../../utils/customError';
import RequestFriendService from '../services/requestFriendService';
import { parse } from 'path';
export default class RequestFriendController {
  static async createRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const requestFriend = req.body;
      const resultInsert =
        await requestFriendService.createRequestFriend(requestFriend);
      if (!resultInsert.success) {
        const error = new CustomError('Error while to save', 400);
        throw error;
      }
      res.status(200).json(resultInsert);
    } catch (error) {
      next(error);
    }
  }

  static async getRequestAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await RequestFriendService.getRequestFriendAll();
      if (!result.success) {
        const error = new CustomError('Error while to get all request', 400);
        throw error;
      }
      res.status(200).json(result.data);
    } catch (error) {
      next(error);
    }
  }

  static async getRequestById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const _id = parseInt(id);
      const result = await RequestFriendService.getRequestFriendById(_id);
      if (!result.success) {
        const error = new CustomError('Error while to get request by id', 400);
        throw error;
      }
      res.status(200).json(result.data);
    } catch (error) {
      next(error);
    }
  }

  static async updateRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const _id = parseInt(id);
      const requestFriend = req.body;
      const result = await RequestFriendService.updateRequestFriend(
        _id,
        requestFriend,
      );
      if (!result.success) {
        const error = new CustomError('Error while to update request', 400);
        throw error;
      }
      res.status(200).json('Update success');
    } catch (error) {
      next(error);
    }
  }

  static async deleteRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const _id = parseInt(id);
      const result = await RequestFriendService.deleteRequestFriend(_id);
      if (!result.success) {
        const error = new CustomError('Error while to delete request', 400);
        throw error;
      }
      res.status(200).json('Delete success');
    } catch (error) {
      next(error);
    }
  }
}
