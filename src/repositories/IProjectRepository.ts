import ICreateProjectDTO from '../dtos/ICreateProjectDTO';
import Project from '../models/Project';

export default interface IProjectRepository {
  findAll(): Promise<Project[]>;
  findAllOfUser(user_id: string): Promise<Project[]>;
  findById(id: string): Promise<Project | undefined>;
  create(createProject: ICreateProjectDTO): Promise<Project>;
  save(project: Project): Promise<Project>;
}
