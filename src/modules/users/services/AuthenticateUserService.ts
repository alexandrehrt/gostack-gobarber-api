import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

/**
 * This class will check the user's email and password, generate a token,
 * and return the user and the token
 */
@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    // Check if e-mail is valid
    const user = await this.usersRepository.findByEmail(email);
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
