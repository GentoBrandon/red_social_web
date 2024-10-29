import express from 'express';
import erroHandling from '../middleware/errorHandling';
class App {
    private app : express.Application;
    private _PORT: number;
    public constructor(PORT:number){
        this.app = express();
        this._PORT = PORT;  
    }
    private settings():void{
       
        this.app.use(express.json());
    }
    private routes():void{
        this.app.get('/',(req,res)=>{
            res.send('Hello World');
        })
    }
    private middlewares():void{
        this.app.use(erroHandling)
    }
    private startServer():void{
        this.app.listen(this._PORT,()=>{
            console.log(`Server running on port ${this._PORT}`);
        });
    }
    private startSettings():void{
        this.settings()
        this.middlewares()
        this.routes();
        this.startServer();
    }
    public start(){
        this.startSettings();
    }


}
export default App;