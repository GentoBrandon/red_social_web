import ProfileController from '../controllers/profileController';
import { Router } from 'express';
const router = Router();
//router.post('/create-profile', ProfileController.createProfile);
router.get('/get-all-profile', ProfileController.getAllProfile);
router.get('/find-profile-id/:id', ProfileController.findProfileById);
router.put('/update-profile/id/:id', ProfileController.updateProfile);
router.delete('delete-profile/id/:id', ProfileController.deleteProfile);
router.get(
  '/find-profile-by-name/:name',
  ProfileController.getProfileNameByName,
);
export default router;
