import ProfileController from '../controllers/profileController';
import { Router } from 'express';
const router = Router();
router.post('/create-profile', ProfileController.createProfile);
export default router;
