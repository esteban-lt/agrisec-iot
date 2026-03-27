import { Router } from 'express';
import { AuthController } from './controller';

export class AuthRoutes {

  public static get routes() {
    const router = Router();

    router.post('/login', AuthController.login);

    return router;
  }
}
