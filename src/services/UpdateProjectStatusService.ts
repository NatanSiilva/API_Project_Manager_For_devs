import ProjectStatus from '../enums/projectStatus';
import AppError from '../errors/AppError';
import Project from '../models/Project';
import IProjectRepository from '../repositories/IProjectRepository';

interface IRequest {
  id: string;
  status: ProjectStatus;
}

class UpdateProjectStatusService {
  private projectRepository: IProjectRepository;

  constructor(
    projectRepository: IProjectRepository,
  ) {
    this.projectRepository = projectRepository;
  }

  public async execute({ id, status }: IRequest): Promise<Project> {
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new AppError('Project not found', 400);
    }

    project.status = status;

    await this.projectRepository.save(project);

    return project;
  }
}

export default UpdateProjectStatusService;
