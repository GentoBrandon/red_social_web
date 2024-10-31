import AuthController from "../controllers/authCotroller";
import { Router } from "express";
import UserSingUp from "../middleware/userSignUp";
const router = Router();

router.post('/register',[
    UserSingUp.verifyUser,
    UserSingUp.verifyEmail,
    UserSingUp.hashPassword
    ],
    AuthController.createPersonWithUserCredentials);
export default router;