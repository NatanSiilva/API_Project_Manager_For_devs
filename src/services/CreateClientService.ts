import AppError from '../errors/AppError';
import Client from '../models/Client';
import ClientRepository from '../repositories/ClientRepository';
import IClientsRepository from '../repositories/IClientsRepository';

interface IRequest {
  name: string;
  email: string;
  phone: string;
  cpf: string;
}

class CreateClientService {
  private clientRepository: IClientsRepository;

  constructor(clientRepository: ClientRepository) {
    this.clientRepository = clientRepository;
  }

  public async execute({ name, email, phone, cpf }: IRequest): Promise<Client> {
    const clientExists = await this.clientRepository.findByEmail(email);

    if (clientExists) {
      throw new AppError('Client already exists', 400);
    }

    const client = this.clientRepository.create({
      name,
      email,
      phone,
      cpf,
    });

    return client;
  }
}

export default CreateClientService;
