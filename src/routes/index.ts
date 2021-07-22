import { Router } from 'express';
import userRoutes from './user';

const routes = Router();
const prefixRoutes = '/api/v1';

routes.get('/', (request, response) =>
  response.json({ message: 'Hello Code83' }),
);

routes.use(`${prefixRoutes}/users`, userRoutes);

export default routes;
