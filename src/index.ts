import express from 'express';
import { STATUS_CODES } from 'http';
import { v4 as uuidv4 } from 'uuid';

import { logInfo, logWarn } from './logger';
import { setConfig, getConnectionPort } from './config';
import { fetchMovie } from './apiConnector';
import { addMovie, deleteMovie, updateMovie, getMovieById, getAllMovies } from './dataStorage';


const appArgs = process.argv.slice(2);

if (!setConfig(appArgs)) {
  logWarn('Wrong application params, try again');
  process.exit(0);
}

const app = express();

function requestLogger(request: any, response: any, next: any) {
  const { route: { path }, method, body, query, headers } = request;
  logInfo( `request: ${path} ${method} ${JSON.stringify(body)} ${JSON.stringify(query)} ${JSON.stringify(headers)}`);
  next();
}

function errorHandler(error: any, request: any, response: any, next: any) {
  console.error(`Error: ${error.message}`);
  response.status(500).send({ error: STATUS_CODES[500] });
  next();
}

app.use(express.json());

app.get('/', requestLogger, (req, res) => {
  res.send({ message: 'Welcome to the Movie library 0.1beta' });
});

app.get('/movies', requestLogger, (req, res) => {
  res.send(getAllMovies());
});

app.post('/movies', requestLogger, async (req, res) => {
  const { name, comment, personalScore } = req.body;
  const resOmdbMovie = await fetchMovie({ name, comment, personalScore });
  let resMovie;
  if (resOmdbMovie.Error) {
    resMovie = addMovie({
      imdbID: uuidv4(),
      name,
      comment,
      personalScore
    });
  } else {
    resMovie = addMovie(resOmdbMovie);
  }
  res.send(resMovie);
});

app.get('/movies/:id', requestLogger, (req, res) => {
  const { id } = req.params;
  const result = getMovieById(id);
  res.send(result);
});

app.delete('/movies/:id', requestLogger, (req, res) => {
  const { id } = req.params;
  const result = deleteMovie(id);
  res.send(result);
});

app.patch('/movies/:id', requestLogger, (req, res) => {
  const { id } = req.params;
  const result = updateMovie(id, req.body);
  res.send(result);
});

app.use(errorHandler);

app.listen(getConnectionPort(), () => {
  const infoMsg = `App listening on the port ${getConnectionPort()}`;
  logInfo(infoMsg, true);
});
