export interface IMovie {
  imdbID: string
  name?: string
  comment?: string
  personalScore?: number
  Title?: string
  Year?: number
  Released?: string
  Runtime?: string
  Genre?: string
  Director?: string
  Writer?: string
  Actors?: string
  Language?: string
  Country?: string
  Poster?: string
  imdbRating?: string
  imdbVotes?: string
  DVD?: string
};

export interface IMovieFetch {
  name: string
  comment: string
  personalScore: number
}

export interface IShortResponse {
  result: boolean
  msg: string
};

const movies: IMovie[] = [];

const isExists = (movie: IMovie): boolean => {
  for (let i = 0; i < movies.length; i++) {
    if ((movies[i].imdbID !== undefined && movies[i].imdbID === movie.imdbID)
      || (movies[i].Title !== undefined && movies[i].Title === movie.Title)
      || (movies[i].name !== undefined && movies[i].name === movie.name)
    ) {
      return true;
    }
  }
  return false;
};

export const addMovie = (movie: IMovie): IMovie | IShortResponse => {
  if (isExists(movie)) {
    return {
      result: true,
      msg: 'Movie already exists!'
    };
  }
  movies.push(movie);
  return movie;
};

export const updateMovie = (imdbID: string, movie: IMovie): IMovie | IShortResponse => {
  let i = 0;
  for (; i < movies.length; i++) {
    if (movies[i].imdbID === imdbID) {
      if (movie.comment) {
        movies[i].comment = movie.comment;
      }
      if (movie.personalScore) {
        movies[i].personalScore = movie.personalScore;
      }
      return movies[i];
    }
  }
  return {
    result: false,
    msg: 'Movie does not exists!'
  };
};

export const deleteMovie = (imdbID: string): IShortResponse => {
  for (let i = 0; i < movies.length; i++) {
    if (movies[i].imdbID === imdbID) {
      movies.splice(i, 1);
      return {
        result: true,
        msg: 'Movie deleted!'
      };
    }
  }
  return {
    result: false,
    msg: 'Movie does not exists!'
  };
};

export const getAllMovies = (): IMovie[] => {
  return movies;
};

export const getMovieById = (imdbID: string): IMovie | IShortResponse => {
  for (let i = 0; i < movies.length; i++) {
    if (movies[i].imdbID === imdbID) {
      return movies[i];
    }
  }
  return {
    result: false,
    msg: 'Movie does not exists!'
  };
};
