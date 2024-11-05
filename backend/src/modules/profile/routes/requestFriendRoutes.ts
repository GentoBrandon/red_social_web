import RequestFriendController from '../controllers/requestFriendController';
import { Router } from 'express';
const router = Router();
router.post('/create-request-friend', RequestFriendController.createRequest);
router.get('/get-request-friend-all', RequestFriendController.getRequestAll);
router.get(
  '/get-request-friend-by-id/:id',
  RequestFriendController.getRequestById,
);
router.put(
  '/accepted-friend/:id1/:id2',
  RequestFriendController.acceptFriendRequest,
);
router.delete(
  '/delete-request-friend/:id',
  RequestFriendController.deleteRequest,
);
router.delete(
  '/delete-friend/:id1/:id2',
  RequestFriendController.rejectFriendRequest,
);
router.get(
  '/get-friends-by-name/:id',
  RequestFriendController.getFriendsByProfileId,
);
export default router;
