import postShareController from '../controllers/postShareController';
import { Router } from 'express';
const routes = Router();

routes.post(
  '/create-post-share',
  postShareController.createPostShareController,
);
routes.get('/get-post-share', postShareController.getAllPostShareController);
routes.get(
  '/get-post-share-id/:id',
  postShareController.getPostShareIdController,
);
routes.delete(
  '/delete-post-share/:id',
  postShareController.deleteIdPostShareController,
);
routes.put('/update-post-share/:id', postShareController.updatePostController);

export default routes;
