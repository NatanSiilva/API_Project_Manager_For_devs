import { Router } from 'express';
import ProjectController from '../controllers/ProjectController';
import authentication from '../middleware/auth';

const projectRoutes = Router();
const projectController = new ProjectController();

projectRoutes.use(authentication);

projectRoutes.get('/', projectController.index);
projectRoutes.get('/:id', projectController.show);
projectRoutes.post('/', projectController.create);
projectRoutes.put('/:id', projectController.update);
projectRoutes.patch('/:id', projectController.changeStatus);

export default projectRoutes;
