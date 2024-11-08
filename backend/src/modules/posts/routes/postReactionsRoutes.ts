import { Router } from 'express';
import postReactionController from '../controllers/postReactionController';

const routes = Router();

routes.post(
  '/insert-reaction',
  postReactionController.insertReactionsPostController,
);
routes.delete(
  '/delete-reaction/:id/:idProfile',
  postReactionController.deleteIdReactionsController,
);
routes.get(
  '/count-reactions/:idPost',
  postReactionController.countReactionsAllController,
);

routes.get(
  '/get-reaction-status/:id_profile/:id_post',
  postReactionController.getReactionByProfileAndPost,
);
export default routes;
