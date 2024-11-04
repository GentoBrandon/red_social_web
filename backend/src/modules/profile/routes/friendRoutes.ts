import FriendController from '../controllers/friendController';
import { Router } from 'express';
const router = Router();
router.post('/create-friend', FriendController.createFriend);
export default router;
