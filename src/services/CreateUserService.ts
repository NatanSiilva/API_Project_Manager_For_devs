import { hash } from 'bcryptjs';
import { json } from 'express';
import IUserRepository from '../repositories/IUserRepository';
import UserRepository from '../repositories/UserRepository';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute({ name, email, password }: Request): Promise<User> {
    const passwordHash = await hash(password, 8);

    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('Client already exists', 400);
    }

    const user = await this.userRepository.create({
      name,
      email,
      password: passwordHash,
    });

    return user;
  }
}

export default CreateUserService;
