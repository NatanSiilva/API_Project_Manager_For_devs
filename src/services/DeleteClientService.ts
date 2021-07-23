import AppError from '../errors/AppError';
import ClientRepository from '../repositories/ClientRepository';
import IClientsRepository from '../repositories/IClientsRepository';

class DeleteClientService {
  private clientRepository: IClientsRepository;

  constructor(clientRepository: ClientRepository) {
    this.clientRepository = clientRepository;
  }

  public async execute(id: string): Promise<void> {
    const clientExists = await this.clientRepository.findById(id);

    if (!clientExists) {
      throw new AppError('Client not found', 400);
    }

    await this.clientRepository.delete(id);
  }
}

export default DeleteClientService;
