import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Loader } from "../../components/loader/Loader";
import { GET_MOVIE_UPDATE } from "../../graphql/queries";
import styles from "./updateById.module.scss";

export default function UpdateById() {
  const { id }: any = useRouter().query;
  const { loading, data, error } = useQuery(GET_MOVIE_UPDATE, {
    variables: {
      movieId: parseInt(id),
    },
  });
  if (loading) return <Loader />;
  if (error) {
    console.log(error);
    return <Loader />;
  }
  const {
    movie_name,
    movie_image,
    movie_description,
    movie_director,
    movie_cast,
    movie_rating,
    movie_type,
    movie_release,
  } = data.getmovie[0];
  return (
    <div className={styles.main_container}>
      <img src={movie_image} />
      <form className={styles.form_container}>
        <input placeholder="movie name" defaultValue={movie_name} />
        <textarea
          placeholder="movie description"
          defaultValue={movie_description}
        />
        <input placeholder="movie director" defaultValue={movie_director} />
        <input placeholder="movie cast" defaultValue={movie_cast} />
        <input
          placeholder="movie rating"
          defaultValue={movie_rating}
          type={"number"}
          min="1"
          max="10"
          step={0.5}
        />
        <select name="type" defaultValue={movie_type}>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Horror">Horror</option>
          <option value="Mystery">Mystery</option>
          <option value="Romance">Romance</option>
          <option value="Thriller">Thriller</option>
          <option value="Western">Western</option>
        </select>
        <input
          placeholder="movie release"
          defaultValue={movie_release}
          type={"number"}
          min="1900"
          max="2023"
        />
      </form>
    </div>
  );
}
