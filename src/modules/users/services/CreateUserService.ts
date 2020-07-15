import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

/**
 * This class will check if email is valid, hash the password and
 * save the new user in the database
 */

export default class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    // Check if e-mail is unique
    const checkUserExists = await usersRepository.findOne({ where: { email } });
    if (checkUserExists) throw new AppError('E-mail address already in use');

    // Hashing password
    const hashedPassword = await hash(password, 8);

    // Create user
    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    // Save user in the database
    await usersRepository.save(user);

    return user;
  }
}
