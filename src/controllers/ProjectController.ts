import { Request, Response } from 'express';
import AppError from '../errors/AppError';
import ClientRepository from '../repositories/ClientRepository';
import ProjectRepository from '../repositories/ProjectRepository';
import CreateProjectService from '../services/CreateProjectService';
import ListAllProjectService from '../services/ListAllProjectService';
import ShowProjectService from '../services/ShowProjectService';
import UpdateProjectService from '../services/UpdateProjectService';
import UpdateProjectStatusService from '../services/UpdateProjectStatusService';

class ProjectController {
  public async index(req: Request, res: Response): Promise<Response> {
    const projectRepository = new ProjectRepository();
    const projectService = new ListAllProjectService(projectRepository);

    const projects = await projectService.execute();

    if (!projects) {
      throw new AppError('No project found', 401);
    }

    return res.json(projects);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const projectRepository = new ProjectRepository();
    const projectService = new ShowProjectService(projectRepository);

    const projects = await projectService.execute(id);

    if (!projects) {
      throw new AppError('No project found', 401);
    }

    return res.json(projects);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, client_id, description, logo } = req.body;

    const projectRepository = new ProjectRepository();
    const clientRepository = new ClientRepository();

    const createProject = new CreateProjectService(
      projectRepository,
      clientRepository,
    );

    const project = await createProject.execute({
      name,
      client_id,
      description,
      logo,
    });

    return res.status(201).json(project);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, client_id, description, logo } = req.body;

    const projectRepository = new ProjectRepository();
    const clientRepository = new ClientRepository();

    const updateProject = new UpdateProjectService(
      projectRepository,
      clientRepository,
    );

    const project = await updateProject.execute({
      id,
      name,
      client_id,
      description,
      logo,
    });

    return res.status(200).json(project);
  }

  public async changeStatus(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status } = req.body;

    const projectRepository = new ProjectRepository();

    const updateProject = new UpdateProjectStatusService(projectRepository);

    const project = await updateProject.execute({
      id,
      status,
    });

    return res.status(200).json(project);
  }
}

export default ProjectController;
