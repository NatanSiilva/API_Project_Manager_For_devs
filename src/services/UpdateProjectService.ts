import AppError from '../errors/AppError';
import Project from '../models/Project';
import IClientsRepository from '../repositories/IClientsRepository';
import IProjectRepository from '../repositories/IProjectRepository';

interface IRequest {
  id: string;
  name: string;
  client_id: string;
  logo: string;
  description: string;
}

class UpdateProjectService {
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
    id,
    name,
    client_id,
    description,
    logo,
  }: IRequest): Promise<Project> {
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new AppError('Project not found', 400);
    }

    const verifyClient = await this.clientRepository.findById(client_id);

    if (!verifyClient) {
      throw new AppError('Client not found', 400);
    }

    project.name = name;
    project.client_id = client_id;
    project.description = description;
    project.logo = logo;

    await this.projectRepository.save(project);

    return project;
  }
}

export default UpdateProjectService;
