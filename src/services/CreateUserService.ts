import { getRepository } from 'typeorm';

import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    // Check if e-mail is unique
    const checkUserExists = await usersRepository.findOne({ where: { email } });
    if (checkUserExists) throw new Error('E-mail address already in use');

    // Saving user in the database
    const user = usersRepository.create({ name, email, password });
    await usersRepository.save(user);

    return user;
  }
}
