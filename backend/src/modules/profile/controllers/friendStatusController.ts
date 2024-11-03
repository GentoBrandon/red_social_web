import FriendStatusService from "../services/friendStatusService"
import { Request, Response, NextFunction} from "express"
import CustomError from "../../../utils/customError"
import { networkInterfaces } from "os";
export default class FriendStatusController {
    static async createFriendStatus(req:Request, res:Response, next:NextFunction):Promise<void> {
        try {
            const {name_status} = req.body;
            const data = {name_status};
           const resultInsert = await FriendStatusService.insertStatus(data.name_status);
           if(!resultInsert.success) {
               const error = new CustomError('Failed to create friend status', 500);
               throw error;
           }
           res.status(201).json({ msg: 'Friend status created successfully' });
        } catch (error) {
            next(error)
        }
    }

    static async getAllFriendStatus(req:Request, res:Response, next:NextFunction):Promise<void> {
        try {
            const resultData = await FriendStatusService.getAllStatus();
            if(!resultData.success) {
                const error = new CustomError('Data Empty', 404);
                throw error;
            }
            res.status(200).json(resultData.data);
        } catch (error) {
            next(error);
        }
    }
    static async findFriendStatusById(req:Request, res:Response, next:NextFunction):Promise<void> {
        try {
            const id = req.params.id;
            const _id = parseInt(id);
            const resultFound = await FriendStatusService.findStatusById(_id);
            if(!resultFound.success) {
                const error = new CustomError('Data not found', 404);
                throw error;
            }
            res.status(200).json(resultFound.data);
        } catch (error) {
            next(error);
        }
    }
      static async updateFriendStatus(req:Request, res:Response, next:NextFunction):Promise<void> {
        try {
            const id = req.params.id;
            const {name_status} = req.body;
            const _id = parseInt(id);
            
            const resultUpdate = await FriendStatusService.updateStatus(_id,name_status)
            if(!resultUpdate.success) {
                const error = new CustomError('Failed to update friend status', 500);
                throw error;
            }
            res.status(200).json({ msg: 'Friend status updated successfully' });  
        } catch (error) {
            next(error);
        }
      }

      static async deleteFriendStatus(req:Request, res:Response, next:NextFunction):Promise<void> {
        try {
            const id = req.params.id;
            const _id = parseInt(id);
            const resultDelete = await FriendStatusService.deleteStatus(_id);
            if(!resultDelete.success) {
                const error = new CustomError('Failed to delete friend status', 500);
                throw error;
            }
            res.status(200).json({ msg: 'Friend status deleted successfully' });
        } catch (error) {
            next(error);
        }
      }
    }

