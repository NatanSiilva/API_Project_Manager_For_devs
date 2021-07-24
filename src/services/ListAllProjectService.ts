import AppError from '../errors/AppError';
import Project from '../models/Project';
import IProjectRepository from '../repositories/IProjectRepository';

class ListAllProjectService {
  private projectRepository: IProjectRepository;

  constructor(projectRepository: IProjectRepository) {
    this.projectRepository = projectRepository;
  }

  public async execute(): Promise<Project[]> {
    const project = await this.projectRepository.findAll();

    if (project.length === 0) {
      throw new AppError('No project found', 400);
    }

    return project;
  }
}

export default ListAllProjectService;
