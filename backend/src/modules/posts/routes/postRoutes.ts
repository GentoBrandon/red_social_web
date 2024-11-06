import { Router } from 'express';
import postController from '../controllers/postsControllers';

const routes = Router();

routes.post('/create-post', postController.createPostController);
routes.get('/get-post', postController.getAllPostsController);
routes.get('/get-id-post/:id', postController.getPostIdController);
routes.delete('/delete-post/:id', postController.deleteIdPostController);
routes.put('/update-post/:id', postController.updatePostController);
routes.get('/get-all-post-profile/:id', postController.getAllPostsByProfile);

export default routes;
