import requestFriendService from '../services/requestFriendService';
import { Request, Response, NextFunction } from 'express';
import CustomError from '../../../utils/customError';
import RequestFriendService from '../services/requestFriendService';

export default class RequestFriendController {
  static async createRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_profile_request, id_profile_response } = req.body;

      const insertUno = {
        id_profile_request,
        id_profile_response,
        id_status: 2,
      };
      const insertDos = {
        id_profile_request: id_profile_response,
        id_profile_response: id_profile_request,
        id_status: 2,
      };
      console.log(insertUno);
      console.log(insertDos);
      const resultInsert =
        await requestFriendService.createRequestFriend(insertUno);

      const resultInsertDos =
        await requestFriendService.createRequestFriend(insertDos);
      if (!resultInsert.success || !resultInsertDos.success) {
        const error = new CustomError('Error while to create request', 400);
        throw error;
      }
      res.status(200).json('insert success');
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

  static async acceptFriendRequest(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id1, id2 } = req.params;
      const _id = parseInt(id1);
      const _id2 = parseInt(id2);

      const result = await RequestFriendService.accepteFriendsByProfileId(
        _id,
        _id2,
      );
      
      if (!result.success) {
        const error = new CustomError('Error while to update request', 400);
        throw error;
      }
      res.status(200).json('accepted success');
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
  static async getFriendsByProfileId(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const profileId = parseInt(id);

      const result =
        await RequestFriendService.getAllFriendsByProfileId(profileId);
      if (!result.success) {
        const error = new CustomError(
          'Error while fetching friends by profile ID',
          400,
        );
        throw error;
      }

      // Retorna el nombre del perfil y la lista de amigos
      res.status(200).json({
        profile: result.profile,
        friends: result.friends,
      });
    } catch (error) {
      next(error);
    }
  }
  static async rejectFriendRequest(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id1, id2 } = req.params;
      const _id = parseInt(id1);
      const _id2 = parseInt(id2);
      const result = await RequestFriendService.rejectFriendsByProfileId(
        _id,
        _id2,
      );
      if (!result.success) {
        const error = new CustomError('Error while to reject request', 400);
        throw error;
      }
      res.status(200).json('Reject success');
    } catch (error) {
      next(error);
    }
  }

  static async getStatusFriend(req: Request, res: Response, next: NextFunction) {
    try {
      const { id1, id2 } = req.params;
      const _id = parseInt(id1);
      const _id2 = parseInt(id2);
      const result = await RequestFriendService.getStatusFriendsByProfileId(_id, _id2);
      if (!result.success) {
        const error = new CustomError('Error while to get status', 400);
        throw error;
      }
      res.status(200).json(result.data);
    } catch (error) {
      next(error);
    }
  }
}
