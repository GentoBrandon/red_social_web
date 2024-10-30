import AuthController from "../controllers/authCotroller";
import { Router } from "express";
const router = Router();

router.post('/register',AuthController.createPersonWithUserCredentials);
export default router;