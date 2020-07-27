import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsControllers = new AppointmentsController();

// Authentication middleware
appointmentsRouter.use(ensureAuthenticated);

// List all appointments
// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

// Create appointment
appointmentsRouter.post('/', appointmentsControllers.create);

export default appointmentsRouter;
