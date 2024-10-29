
export default class CustomError extends Error{
    statusCode:number;
    details:any;
    constructor(message:string,status:number){
        super(message);
        this.statusCode = status;
        
        this.details = "no details"
        Object.setPrototypeOf(this, CustomError.prototype);
    }

}