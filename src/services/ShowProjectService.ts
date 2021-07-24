import AppError from '../errors/AppError';
import Project from '../models/Project';
import IClientsRepository from '../repositories/IClientsRepository';
import IProjectRepository from '../repositories/IProjectRepository';


class ShowProjectService {
  private projectRepository: IProjectRepository;

  constructor(
    projectRepository: IProjectRepository,
  ) {
    this.projectRepository = projectRepository;
  }

  public async execute(id: string): Promise<Project> {
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new AppError('Project not found', 400);
    }

    await this.projectRepository.save(project);

    return project;
  }
}

export default ShowProjectService;
