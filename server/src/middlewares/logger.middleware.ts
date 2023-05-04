import * as morgan from 'morgan';
import * as os from 'os';
import { Request, Response } from 'express';

// custom tokens

morgan.token('hostname', () => {
  return os.hostname();
});

morgan.token('requestHeaders', (req) => JSON.stringify(req.headers));

morgan.token('responseHeaders', (req, res) => JSON.stringify(res.getHeaders()));

// JSON format

const loggerFormatJSON = (tokens: morgan.TokenIndexer<Request, Response>, req: Request, res: Response): string => {
  return JSON.stringify({
    'app-build': process.env.APP_BUILD,
    'app-name': process.env.APP_PACKAGE_NAME,
    'app-version': process.env.APP_VERSION,
    'content-length': tokens.res(req, res, 'content-length'),
    'http-version': `HTTP/${tokens['http-version'](req, res)}`,
    'remote-address': tokens['remote-addr'](req, res),
    'response-time': `${tokens['response-time'](req, res, '')}`,
    'total-time': `${tokens['total-time'](req, res, '')}`,
    'user-agent': tokens['user-agent'](req, res),
    hostname: tokens.hostname(req, res),
    method: tokens.method(req, res),
    status: tokens.status(req, res),
    url: tokens.url(req, res),
    request: {
      headers: JSON.parse(tokens.requestHeaders(req, res) || '[]'),
    },
    response: {
      headers: JSON.parse(tokens.responseHeaders(req, res) || '[]'),
    },
  });
};

const loggerMiddleware = morgan(loggerFormatJSON);

export { loggerMiddleware };
