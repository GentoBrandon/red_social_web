import UserCredentialsController from '../../person/controllers/userCrendentialController';
import { Router } from 'express';
import validatorsUserCredential from '../validators/validatorsUserCredential';
const router = Router();
router.post(
  '/create-user-credentials',
  validatorsUserCredential.inputCreateUserCredential(),
  UserCredentialsController.createUserCredential,
);
router.get(
  '/get-all-user-credentials',
  UserCredentialsController.getAllUserCredentials,
);
export default router;
