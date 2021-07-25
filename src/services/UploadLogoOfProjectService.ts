import AppError from '../errors/AppError';
import Project from '../models/Project';
import IProjectRepository from '../repositories/IProjectRepository';

interface IRequest {
  id: string;
  logo: string;
}

class UploadLogoOfProjectService {
  private projectRepository: IProjectRepository;

  constructor(projectRepository: IProjectRepository) {
    this.projectRepository = projectRepository;
  }

  public async execute({ id, logo }: IRequest): Promise<Project> {
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new AppError('Project not found', 400);
    }

    project.logo = logo;

    await this.projectRepository.save(project);

    return project;
  }
}

export default UploadLogoOfProjectService;
