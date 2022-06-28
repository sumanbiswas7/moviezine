import { useQuery } from "@apollo/client";
import { Loader } from "../../components/loader/Loader";
import { MoviePage } from "../../components/movie/MoviePage";
import { NavBar } from "../../components/navbar/NavBar";
import { GET_20_MOVIES } from "../../graphql/queries";
import styles from "./movies.module.scss";

interface MoviePage {
  movie_id: number;
  movie_image: string;
  movie_rating: string;
  movie_release: number;
  movie_name: string;
  movie_type: string;
}

export default function Movies() {
  const { loading, error, data } = useQuery(GET_20_MOVIES);

  if (loading) return <Loader />;
  if (error) return <Loader />;
  const movie = data.randommovies;

  return (
    <>
      <NavBar />
      <div className={styles.movie_row}>
        <div className={styles.movie_row_1}>
          {movie.slice(0, movie.length / 2).map((item: MoviePage) => {
            return (
              <MoviePage
                key={item.movie_id}
                movie_image={item.movie_image}
                movie_name={item.movie_name}
                movie_rating={item.movie_rating}
                movie_release={item.movie_release}
                movie_type={item.movie_type}
                movie_id={item.movie_id}
              />
            );
          })}
        </div>
        <div className={styles.movie_row_2}>
          {movie
            .slice(movie.length / 2, movie.length)
            .map((item: MoviePage) => {
              return (
                <MoviePage
                  key={item.movie_id}
                  movie_image={item.movie_image}
                  movie_name={item.movie_name}
                  movie_rating={item.movie_rating}
                  movie_release={item.movie_release}
                  movie_type={item.movie_type}
                  movie_id={item.movie_id}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}
