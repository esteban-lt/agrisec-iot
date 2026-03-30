import { Router } from 'express';
import { ReadingsController } from './controller';
import { AuthMiddleware } from '../middlewares/auth-middleware';

export class ReadingsRoutes {

  public static get routes() {
    const router = Router();

    router.get('/', AuthMiddleware.requireAuth, ReadingsController.getAll);
    router.get('/anomalies', AuthMiddleware.requireAuth,ReadingsController.getAnomalies);

    return router;
  }
}