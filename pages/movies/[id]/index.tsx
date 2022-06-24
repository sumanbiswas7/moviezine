import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Loader } from "../../../components/loader/Loader";
import { Movie } from "../../../components/movie/Movie";
import { GET_MOVIE_BY_ID } from "../../../graphql/queries";
import styles from "./moviesById.module.scss";

export default function Id() {
  const { id }: any = useRouter().query;
  const { data, loading, error } = useQuery(GET_MOVIE_BY_ID, {
    variables: { movieId: parseInt(id) },
  });
  if (loading) return <Loader />;
  if (error) {
    console.log(error);
    return <Loader />;
  }

  const movie = data.getmovie[0];
  return (
    <div className={styles.main_continer}>
      <Movie
        name={movie.movie_name}
        description={movie.movie_description}
        director={movie.movie_director}
        image={movie.movie_image}
        rating={parseFloat(movie.movie_rating).toFixed(1)}
      />
    </div>
  );
}
