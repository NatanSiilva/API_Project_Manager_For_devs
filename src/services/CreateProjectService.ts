import ProjectStatus from '../enums/projectStatus';
import AppError from '../errors/AppError';
import Project from '../models/Project';
import IClientsRepository from '../repositories/IClientsRepository';
import IProjectRepository from '../repositories/IProjectRepository';

interface IRequest {
  name: string;
  client_id: string;
  logo: string;
  description: string;
}

class CreateProjectService {
  private projectRepository: IProjectRepository;

  private clientRepository: IClientsRepository;

  constructor(
    projectRepository: IProjectRepository,
    clientRepository: IClientsRepository,
  ) {
    this.projectRepository = projectRepository;
    this.clientRepository = clientRepository;
  }

  public async execute({
    name,
    client_id,
    description,
    logo,
  }: IRequest): Promise<Project> {
    const verifyClient = await this.clientRepository.findById(client_id);

    if (!verifyClient) {
      throw new AppError('Client not found', 400);
    }

    const project = this.projectRepository.create({
      name,
      client_id,
      description,
      logo,
      status: ProjectStatus.NEW
    });

    return project;
  }
}

export default CreateProjectService;
