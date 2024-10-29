import { Router } from "express";
import  PersonController  from "../controllers/personController";
const router   = Router();
import PersonValidators from "../validators/personValidators";

router.post('/create-new-person',PersonValidators.input(), PersonController.createPerson)
export default router