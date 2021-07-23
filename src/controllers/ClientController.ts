import { Request, Response } from 'express';
import AppError from '../errors/AppError';
import ClientRepository from '../repositories/ClientRepository';
import CreateClientService from '../services/CreateClientService';
import UpdateClientService from '../services/UpdateClientService';

class ClientController {
  public async index(req: Request, res: Response): Promise<Response> {
    const clientRepository = new ClientRepository();

    const clients = await clientRepository.getAll();

    if (!clients) {
      throw new AppError('Cadastrar novos clientes', 401);
    }

    return res.json(clients);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, phone, cpf } = req.body;

    const clientRepository = new ClientRepository();
    const createClient = new CreateClientService(clientRepository);

    const client = await createClient.execute({
      name,
      email,
      phone,
      cpf,
    });

    return res.status(201).json(client);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, email, phone, cpf } = req.body;

    const clientRepository = new ClientRepository();
    const updateClient = new UpdateClientService(clientRepository);

    const client = await updateClient.execute({
      id,
      name,
      email,
      phone,
      cpf,
    });

    return res.json(client);
  }
}

export default ClientController;
