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
export default routes;
