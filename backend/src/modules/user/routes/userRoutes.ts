import { Router } from 'express';
import UserContoller from '../controllers/userControler';
const router = Router();

router.post('/create-user', UserContoller.createUser);
router.get('/obtenerTodos', UserContoller.obtenerDatos);
router.get('/getId/:id', UserContoller.getIdUser);
router.delete('/deleteId/:id', UserContoller.deleteIdUser);

export default router;
