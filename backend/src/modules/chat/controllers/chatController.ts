import { Request,Response,NextFunction } from "express";
import { app } from "../../..";
class ChatController {
  public async getChat(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        
      res.status(200).json({message: 'Chat'});
    } catch (error) {
      next(error);
    }
  }
}