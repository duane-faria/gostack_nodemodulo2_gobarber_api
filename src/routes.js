import { Router } from 'express';
import multer from 'multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AuthMiddleware from './app/middlewares/auth';
import configMulter from './config/multer';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';

const routes = new Router();

const upload = multer(configMulter);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(AuthMiddleware);

routes.put('/users', UserController.update);
routes.get('/providers', ProviderController.index);

routes.post('/files', upload.single('file'), FileController.store);
routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);
routes.delete('/appointment/:id', AppointmentController.delete);

routes.get('/notifications', NotificationController.index);
routes.put('/notification/:id', NotificationController.update);

routes.get('/schedule', ScheduleController.index);

export default routes;
