import { Router } from 'express';
import PersonController from '../controllers/personController';
const router = Router();
import PersonValidators from '../validators/personValidators';

router.post(
  '/create-new-person',
  PersonValidators.input(),
  PersonController.createPerson,
);

router.get('/get-all-persons', PersonController.getPerson);
router.put(
  '/update-person/:id',
  PersonValidators.inputUpdate(),
  PersonController.updatePerson,
);

router.get(
  '/get-person-by-id/:id',
  PersonValidators.inputId(),
  PersonController.getPersonById,
);
router.delete(
  '/delete-person/:id',
  PersonValidators.inputId(),
  PersonController.deletePerson,
);

router.get('/find-person/name/:name', PersonController.findPersonByName);
export default router;