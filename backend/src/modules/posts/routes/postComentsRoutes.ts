import { Router } from 'express';
import PostComentsController from '../controllers/postComentsControllers';

const routes = Router();

routes.post('/insert-coments', PostComentsController.insertComentsController);
routes.get('/getall-coments', PostComentsController.getCommentsControllerAll);
routes.delete(
  '/delete-coments/:id',
  PostComentsController.deleteCommentsIdController,
);
routes.get(
  '/count-coments/:idPost',
  PostComentsController.countCommentsPostController,
);
routes.get(
  '/coments-post/:idPost',
  PostComentsController.getPostWithCommentsController,
);
export default routes;
