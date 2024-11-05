import RequestFriendController from '../controllers/requestFriendController';
import { Router } from 'express';
const router = Router();
router.post('/create-request-friend', RequestFriendController.createRequest);

router.put(
  '/accepted-friend/:id1/:id2',
  RequestFriendController.acceptFriendRequest,
);

router.delete(
  '/reject-friend/:id1/:id2',
  RequestFriendController.rejectFriendRequest,
);
router.get(
  '/get-friends-commons-friends/:id',
  RequestFriendController.getFriendsByProfileId,
);
export default router;
