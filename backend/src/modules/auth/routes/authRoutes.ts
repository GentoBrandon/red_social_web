import AuthController from '../controllers/authCotroller';
import { Router } from 'express';
import UserSingUp from '../middleware/userSignUp';
import auth from '../../../middleware/auth';
import UserSignIn from '../middleware/userSignIn';
const router = Router();

router.post(
  '/register',
  [UserSingUp.verifyUser, UserSingUp.verifyEmail, UserSingUp.hashPassword],
  AuthController.createPersonWithUserCredentials,
);
router.post('/login', UserSignIn.verifyUserPassword, AuthController.login);
router.get('/dashboard', auth.verifyToken, AuthController.dashboard);
router.post('/logout', auth.verifyToken, AuthController.logout);
export default router;
