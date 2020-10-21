import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsControllers = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

// Authentication middleware
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentsControllers.create);
appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;
