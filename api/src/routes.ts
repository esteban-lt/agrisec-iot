import { Router } from "express";

class Routes {

  public static get routes() {
    const router = Router();

    router.get('/test', (_request, response) => response.json({ ok: true }));

    return router;
  }
}

export default Routes;
