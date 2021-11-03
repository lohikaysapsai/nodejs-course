import { createServer, IncomingMessage, ServerResponse } from 'http';

import {
  logInfo,
  logWarn,
  logError
} from './logger';

import {
  setConfig,
  getConnectionPort
} from './config';

const appArgs = process.argv.slice(2);

if (!setConfig(appArgs)) {
  logWarn('Wrong application params, try again');
  process.exit(0);
}

createServer((req: IncomingMessage, res: ServerResponse) => {
  const chunks: Buffer[] = [];
  let body: Record<string, unknown> | null = null;
  logInfo('New connection');
  
  req.on('data', (data) => {
    chunks.push(data);
  }).on('end', () => {
    const rawBody = Buffer.concat(chunks).toString();
    body = JSON.parse(rawBody);
    logInfo(JSON.stringify(body));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(rawBody);
  });
}).listen(getConnectionPort(), () => logInfo(`Server listen on the ${getConnectionPort()} port`));

process.on('uncaughtException', (err, origin) => {
  logInfo(origin);
  logError(err.message);
});

process.on('unhandledRejection', (reasone, promise) => {
  logError(`${reasone}`);
  logError(`${promise}`);
});

