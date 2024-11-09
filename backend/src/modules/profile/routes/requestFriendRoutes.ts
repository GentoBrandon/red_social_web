import RequestFriendController from '../controllers/requestFriendController';
import { Router } from 'express';
const router = Router();
router.post('/create-request-friend', RequestFriendController.createRequest);
router.get('/get-request-friend-all', RequestFriendController.getRequestAll);
router.get(
  '/get-request-friend-by-id/:id',
  RequestFriendController.getRequestById,
);

router.delete(
  '/delete-request-friend/:id',
  RequestFriendController.deleteRequest,
);
router.delete('/reject-friend/:id1/:id2', RequestFriendController.rejectFriendRequest);
router.get(
  '/get-friends-commons-friends/:id',
  RequestFriendController.getFriendsByProfileId,
);
router.get('/profile/:id/friends/count', RequestFriendController.getFriendCountByProfileId);
router.get('/get-requests-friend/:id', RequestFriendController.getRequestById);
router.get('/get-received-friend/:id',RequestFriendController.getReceibedRequest)


router.get('/friends/search/:id', RequestFriendController.searchFriendsByName);
export default router;
