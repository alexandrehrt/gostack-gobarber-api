import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

/**
 * This class will check if email is valid, hash the password and
 * save the new user in the database
 */

export default class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    // Check if e-mail is unique
    const checkUserExists = await this.usersRepository.findByEmail(email);
    if (checkUserExists) throw new AppError('E-mail address already in use');

    // Hashing password
    const hashedPassword = await hash(password, 8);

    // Create user
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
