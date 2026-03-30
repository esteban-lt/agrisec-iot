import { Router } from 'express';
import { ActuatorsController } from './controller';
import { AuthMiddleware } from '../middlewares/auth-middleware';

export class ActuatorsRoutes {

  public static get routes() {
    const router = Router();

    router.get('/logs', AuthMiddleware.requireAuth, ActuatorsController.getLogs);
    router.post('/trigger', AuthMiddleware.requireAuth, AuthMiddleware.requireRole('PRODUCTOR'), ActuatorsController.trigger);

    return router;
  }
}
