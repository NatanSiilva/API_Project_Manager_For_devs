import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import UserRepository from '../repositories/UserRepository';
import EnableUserService from '../services/EnableUserService';

class UserController {
  public async index(req: Request, res: Response): Promise<Response> {
    const userRespository = new UserRepository();

    const users = await userRespository.getAll();

    const newUsers = [];
    for (let { id, name, email, active, created_at, updated_at } of users) {
      newUsers.push({ id, name, email, active, created_at, updated_at });
    }

    return res.json(newUsers);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const userRespository = new UserRepository();
    const createUser = new CreateUserService(userRespository);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  }

  public async enable(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const userRespository = new UserRepository();
    const enableUser = new EnableUserService(userRespository);

    const user = await enableUser.execute({
      id,
    });

    delete user.password;

    return response.json(user);
  }
}

export default UserController;
