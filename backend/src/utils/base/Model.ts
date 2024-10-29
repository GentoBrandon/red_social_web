export default abstract class Model{
     private static  table : string;
    abstract create(data:any):Promise<any>;
    abstract getAll():Promise<any>;
    abstract update(id:number,data:any):Promise<any>;
    abstract delete(id:number):Promise<any>;
}