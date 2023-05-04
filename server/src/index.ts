import * as express from 'express';
import * as helmet from 'helmet';

import { routes } from './routes';
import { loggerMiddleware } from './middlewares';

// express init
const app = express();
const port = process.env.APP_PORT || 3000;

// middleware to secure Express
app.use(helmet.contentSecurityPolicy());

// middleware to log HTTP requests
app.use(loggerMiddleware);

// routes
app.use(routes);

// start server
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${port} in ${app.get('env')} mode over HTTP`);
});
