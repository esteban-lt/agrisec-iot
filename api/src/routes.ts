import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { AuthMiddleware } from './middlewares/auth-middleware';
import { ReadingsRoutes } from './readings/routes';
import { ActuatorsRoutes } from './actuators/routes';

class Routes {

  public static get routes() {
    const router = Router();

    router.use('/api/auth', AuthRoutes.routes);
    // router.get('/test', (_request, response) => response.json({ ok: true }));
    // router.get('/api/auth-test', AuthMiddleware.requireAuth, (_request, response) => response.json({ ok: true }));
    router.use('/api/readings', ReadingsRoutes.routes);
    router.use('/api/actuators', ActuatorsRoutes.routes);

    return router;
  }
}

export default Routes;
