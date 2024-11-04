import FriendStatusController from '../controllers/friendStatusController';
import { Router } from 'express';
const router = Router();

router.post('/create-status', FriendStatusController.createFriendStatus);
router.get('/get-all-status', FriendStatusController.getAllFriendStatus);
router.get('/get-status-id/:id', FriendStatusController.findFriendStatusById);
export default router;
