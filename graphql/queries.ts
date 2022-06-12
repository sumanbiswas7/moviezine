import { gql } from "@apollo/client";

// HOMEPAGE
export const SIX_RANDOM_MOVIES = gql`
  query {
    randommovies(limit: 6) {
      movie_image
      movie_id
    }
  }
`;
