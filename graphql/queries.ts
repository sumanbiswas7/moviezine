import { gql } from "@apollo/client";

// HOMEPAGE
export const SIX_RANDOM_MOVIES = gql`
  query {
    randommovies(limit: 6) {
      movie_image
      movie_id
      movie_rating
    }
  }
`;

// MOVIES BY ID
export const GET_MOVIE_BY_ID = gql`
  query ($movieId: Int!) {
    getmovie(movieId: $movieId) {
      movie_name
      movie_image
      movie_description
      movie_director
      movie_rating
    }
  }
`;

// MOVIES FOR UPDATE
export const GET_MOVIE_UPDATE = gql`
  query ($movieId: Int!) {
    getmovie(movieId: $movieId) {
      movie_name
      movie_image
      movie_description
      movie_director
      movie_cast
      movie_rating
      movie_type
      movie_release
    }
  }
`;

export const UPDATE_MOVIE = gql`
  mutation ($movie: updateMovie!) {
    updateMovie(movie: $movie)
  }
`;
