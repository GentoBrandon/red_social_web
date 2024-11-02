import FriendStatusModel from "../models/friendStatusModel";

export default class FriendStatusService{
    static async insertStatus(name: string){
        try {
            const result = await FriendStatusModel.insert({name_status: name});
            if(!result){
                return {
                    success: false,
                }
            }
            return {
                success: true,
            }
        } catch (error) {
            throw{
                message: (error as Error).message,
                stack : (error as Error).stack
            }
        }
    }
    static async getAllStatus(){
        try {
            const result = await FriendStatusModel.getAll();
            if(result.length === 0){
                return {
                    success: false,
                }
            }
            return {
                success: true,
                data: result
            }
        } catch (error) {
            throw{
                message: (error as Error).message,
                stack : (error as Error).stack
            }
        }
    }

    static async findStatusById(id: number){
        try {
            const result = await FriendStatusModel.find(id);
            if(!result){
                return {
                    success: false,
                }
            }
            return {
                success: true,
                data: result
            }
        } catch (error) {
            throw{
                message: (error as Error).message,
                stack : (error as Error).stack
            }
        }
    }
    static async updateStatus(id: number, name_status: string){
        try {
            const resultFound = await FriendStatusModel.find(id);
            
            if(!resultFound){
                return {
                    success: false,
                }
            }
            const data = {name_status}
            const result = await FriendStatusModel.update(id, data);
            if(result === 0){
                return {
                    success: false,
                }
            }
            return {
                success: true,
            }
        } catch (error) {
            throw{
                message: (error as Error).message,
                stack : (error as Error).stack
            }
        }
    }

    static async deleteStatus(id: number){
        try {
            const resultFound = await FriendStatusModel.find(id);
            if(!resultFound){
                return {
                    success: false,
                }
            }
            const result = await FriendStatusModel.delete(id);
            if(result === 0){
                return {
                    success: false,
                }
            }
            return {
                success: true,
            }
        } catch (error) {
            throw{
                message: (error as Error).message,
                stack : (error as Error).stack
            }
        }
    }   
}