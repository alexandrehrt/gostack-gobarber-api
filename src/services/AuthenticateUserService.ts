import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import AppError from '../errors/AppError';
import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

export default class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    // Check if e-mail is valid
    const user = await userRepository.findOne({ where: { email } });
    if (!user) throw new AppError('Invalid e-mail or password.', 401);

    // Check if password is valid
    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched)
      throw new AppError('Invalid e-mail or password.', 401);

    // JWT
    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}
