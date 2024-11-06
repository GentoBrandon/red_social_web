import { Router } from 'express';
import postController from '../controllers/postsControllers';

const routes = Router();

routes.post('/create-post', postController.createPostController);
routes.get('/get-post', postController.getAllPostsController);
routes.get('/get-id-post/:id', postController.getPostIdController);
routes.delete('/delete-post/:id', postController.deleteIdPostController);// delete por id post
routes.delete('/delete-post-profile/:id/:idProfile',postController.deleteIdPostProfileController);
routes.put('/update-post/:id', postController.updatePostController);

export default routes;