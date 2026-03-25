import Server from './server';
import Routes from './routes';

const port = Number(process.env.PORT);

function main() {
  const server = new Server({
    port: port,
    routes: Routes.routes,
  });

  server.start();
}

main();
