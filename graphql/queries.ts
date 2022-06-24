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
    }
  }
`;
