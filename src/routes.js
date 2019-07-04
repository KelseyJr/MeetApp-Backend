import { Router } from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import MeetUpController from './app/controllers/MeetUpController';
import SubscriptionController from './app/controllers/SubscriptionController';
import OrganizingController from './app/controllers/OrganizingController';

import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/meetup', MeetUpController.index);
routes.post('/meetup', MeetUpController.store);
routes.put('/meetup/:id', MeetUpController.update);
routes.delete('/meetup/:id', MeetUpController.delete);

routes.post('/meetup/:id/subscriptions', SubscriptionController.store);
routes.get('/subscriptions', SubscriptionController.index);

routes.get('/organizing', OrganizingController.index);

export default routes;
