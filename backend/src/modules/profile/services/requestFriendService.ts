import {RequestFriend,RequestFriendModel} from '../models/requestFriendModel'
import {Request,Response,NextFunction} from 'express'
export default class RequestFriendService {
   static async createRequestFriend(requestFriend: RequestFriend){
        try {
            const result = await RequestFriendModel.insertRequestFriend(requestFriend);
            if(!result){
                return {
                    success: false
                }
            }
            return {
                success: true
            }
        } catch (error) {
            throw{
                message: (error as Error).message,
                stack : (error as Error).stack
            }
        }
   }
   
   static async getRequestFriendAll(){
        try {
            const result = await RequestFriendModel.getRequestFriendAll();
            if(result.length === 0){
                return {
                    success: false
                }
            }
            return {
                success: true,
                data: result
            }
        } catch (error) {
            throw {
                message: (error as Error).message,
                stack : (error as Error).stack
            }
        }
   }
   
   static async getRequestFriendById(id:number){
        try {
            const result = await RequestFriendModel.getRequestFriendById(id);
            if(!result){
                return {
                    success: false
                }
            }
            return {
                success: true,
                data: result
            }
        } catch (error) {
            throw {
                message: (error as Error).message,
                stack : (error as Error).stack
            }
        }
   }
   
   static async updateRequestFriend(id:number,requestFriend: RequestFriend){
        try {
            const result = await RequestFriendModel.updateRequestFriend(id,requestFriend);
            if(result === 0){
                return {
                    success: false
                }
            }
            return {
                success: true
            }

        } catch (error) {
            throw {
                message: (error as Error).message,
                stack : (error as Error).stack
            }
        }
   }
   static async deleteRequestFriend(id:number){
        try {
            const result = await RequestFriendModel.deleteRequestFriend(id);
            if(result === 0){
                return {
                    success: false
                }
            }
            return {
                success: true
            }
        } catch (error) {
            throw {
                message: (error as Error).message,
                stack : (error as Error).stack
            }
        }
   }
}