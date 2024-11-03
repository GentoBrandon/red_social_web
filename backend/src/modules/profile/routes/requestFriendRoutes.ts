import RequestFriendController from '../controllers/requestFriendController';
import { Router } from 'express';
const router = Router();
router.post('/create-request-friend', RequestFriendController.createRequest);
router.get('/get-request-friend-all', RequestFriendController.getRequestAll);
router.get(
  '/get-request-friend-by-id/:id',
  RequestFriendController.getRequestById,
);
router.put('/update-request-friend/:id', RequestFriendController.updateRequest);
router.delete(
  '/delete-request-friend/:id',
  RequestFriendController.deleteRequest,
);
export default router;
