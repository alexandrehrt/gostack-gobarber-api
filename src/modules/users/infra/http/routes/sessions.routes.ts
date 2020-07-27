import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

/**
 * This route will create a new session
 * It requires user's email and password, and return the user and a token
 */

sessionsRouter.post('/', sessionsController.create);

export default sessionsRouter;
