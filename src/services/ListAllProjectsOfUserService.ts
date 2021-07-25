import AppError from '../errors/AppError';
import Project from '../models/Project';
import IProjectRepository from '../repositories/IProjectRepository';

class ListAllProjectsOfUserService {
  private projectRepository: IProjectRepository;

  constructor(projectRepository: IProjectRepository) {
    this.projectRepository = projectRepository;
  }

  public async execute(user_id: string): Promise<Project[]> {
    const project = await this.projectRepository.findAllOfUser(user_id);

    if (project.length === 0) {
      throw new AppError('Projects not found', 400);
    }

    return project;
  }
}

export default ListAllProjectsOfUserService;
