import ProjectStatus from "../enums/projectStatus";

export default interface ICreateProjectDTO {
  name: string;
  client_id: string;
  status: ProjectStatus;
  logo?: string;
  description: string;
}