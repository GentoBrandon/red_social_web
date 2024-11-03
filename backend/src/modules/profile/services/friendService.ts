import {Friend,FriendModel} from '../models/friendModel'

export default class FriendService{
    static async insertFriend(friend:Friend){
        try {
            const result = await FriendModel.insert(friend);
            if(!result){
                return {
                    success:false
                }
            }
            return {
                success:true
            }
        } catch (error) {
            throw {
                message: (error as Error).message,
                stack: (error as Error).stack
            }
        }
    }

    static async getFriendsAll(){
        try {
            const result = await FriendModel.getAll();
            if(!result){
                return {
                    success:false
                }
            }
            return {
                success:true,
                data:result
            }
        } catch (error) {
            throw {
                message: (error as Error).message,
                stack: (error as Error).stack
            }
        }
    }
    static async getFriendById(id:number){
        try {
            const result = await FriendModel.find(id);
            if(!result){
                return {
                    success:false
                }
            }
            return {
                success:true,
                data:result
            }
        } catch (error) {
            throw {
                message: (error as Error).message,
                stack: (error as Error).stack
            }
        }
    }
    static async updateFriend(id:number,friend:Friend){
        try {
            const result = await FriendModel.update(id,friend);
            if(!result){
                return {
                    success:false
                }
            }
            return {
                success:true
            }
        } catch (error) {
            throw {
                message: (error as Error).message,
                stack: (error as Error).stack
            }
        }
    }
    static async deleteFriend(id:number){
        try {
            const result = await FriendModel.delete(id);
            if(!result){
                return {
                    success:false
                }
            }
            return {
                success:true
            }
        } catch (error) {
            throw {
                message: (error as Error).message,
                stack: (error as Error).stack
            }
        }
    }
}