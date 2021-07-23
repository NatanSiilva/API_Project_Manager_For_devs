import { Request, Response } from 'express';
import AppError from '../errors/AppError';
import ClientRepository from '../repositories/ClientRepository';
import CreateClientService from '../services/CreateClientService';
import DeleteClientService from '../services/DeleteClientService';
import PaginatedClientService from '../services/PaginatedClientService';
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

  public async paginated(req: Request, res: Response): Promise<Response> {
    const { page } = req.query;

    const clientRepository = new ClientRepository();
    const clientPaginated = new PaginatedClientService(clientRepository);

    const clients = await clientPaginated.execute({
      page: page !== undefined ? parseInt(page.toString(), 10) : 0, //decimal, ou 0 pq não passou o page
    });

    return res.json(clients);
  }

  public async search(req: Request, res: Response): Promise<Response> {
    const { name } = req.query;

    const clientRepository = new ClientRepository();

    const clients = await clientRepository.findAllName(name?.toString() || '');

    if (clients.length === 0) {
      throw new AppError('Nenhum cliente encontrado', 404);
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

  public async destroy(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const clientRepository = new ClientRepository();
    const destroy = new DeleteClientService(clientRepository);

    await destroy.execute(id);

    return res.json({
      success: true,
      data: {
        status: 201,
        message: 'Cliente removido com sucesso',
      },
    });
  }
}

export default ClientController;
