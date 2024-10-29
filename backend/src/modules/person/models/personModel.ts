
import db from "../../../config/dbConfig"; 
interface person{
    first_name:string,
    last_name:string,
    birth_date: Date,
    email:string
}
export class PersonModel{
    static async createPerson(person:person){
        try{
        const resultInsert  =await db('person').insert(person).returning('id');
        if(!resultInsert){
            return {
                success: false,
            }
        }
        return {
            success: true,
            id: resultInsert[0]
        }
    }catch(error){
        throw{
            message: 'Error creating person',
            stack : (error as Error).stack
        }
    }
}
}