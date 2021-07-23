import User from '../models/User';
import CreateUserDTO from '../dtos/CreateUserDTO';

export default interface IUserRepository {
  getAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  create(createUserDTO: CreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
