import axios from 'axios';

import { omdbUrl } from './constants';
import { IMovieFetch } from './dataStorage';
import { getApiKey } from './config';

import { logError } from './logger';
  

export const fetchMovie = async (movie: IMovieFetch) => {
  try {
    const { status, data } = await axios.get(`${omdbUrl}?apikey=${getApiKey()}&t=${movie.name}`);
    if (status === 200) {
      return data;
    }
  } catch (error) {
    logError(`${error}`);
  }
}
