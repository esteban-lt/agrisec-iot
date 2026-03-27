import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { AuthMiddleware } from './middlewares/auth-middleware';

class Routes {

  public static get routes() {
    const router = Router();

    router.get('/test', (_request, response) => response.json({ ok: true }));
    router.use('/api/auth', AuthRoutes.routes);
    router.get('/api/auth-test', AuthMiddleware.requireAuth, (_request, response) => response.json({ ok: true }));

    return router;
  }
}

export default Routes;
