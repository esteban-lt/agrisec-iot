import express, { Router } from 'express';

interface Options {
  port: number;
  routes: Router;
}

class Server {
  private app = express();
  private port: number;
  private routes: Router;

  constructor({ port, routes }: Options) {
    this.port = port;
    this.routes = routes;
  }

  public async start() {
    this.app.use(express.json());
    this.app.use(express.urlencoded());
    this.app.use(this.routes);

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default Server;
