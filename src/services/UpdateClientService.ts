import AppError from '../errors/AppError';
import Client from '../models/Client';
import ClientRepository from '../repositories/ClientRepository';
import IClientsRepository from '../repositories/IClientsRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
}

class UpdateClientService {
  private clientRepository: IClientsRepository;

  constructor(clientRepository: ClientRepository) {
    this.clientRepository = clientRepository;
  }

  public async execute({
    id,
    name,
    email,
    phone,
    cpf,
  }: IRequest): Promise<Client> {
    const client = await this.clientRepository.findById(id);

    if (!client) {
      throw new AppError('Client not found', 400);
    }

    // se
    if (email !== client.email) {
      const verifyEmail = await this.clientRepository.findByEmail(email);

      if (verifyEmail) {
        throw new AppError('E-mail already used', 400);
      }
    }

    client.name = name;
    client.email = email;
    client.phone = phone;
    client.cpf = cpf;

    await this.clientRepository.save(client);

    return client;
  }
}

export default UpdateClientService;
