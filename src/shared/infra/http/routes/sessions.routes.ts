import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

/**
 * This route will create a new session
 * It requires user's email and password, and return the user and a token
 */

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({ email, password });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
