
export default class CustomError extends Error{
    statusCode:number;
    details:string;
    constructor(message:string,status:number){
        super(message);
        this.statusCode = status;
        Object.setPrototypeOf(this, CustomError.prototype);
        this.details = "no details"
    }

}