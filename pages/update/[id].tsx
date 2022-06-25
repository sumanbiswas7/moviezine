import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { FormEvent } from "react";
import { Loader, UpdateLoader } from "../../components/loader/Loader";
import {
  GET_MOVIE_BY_ID,
  GET_MOVIE_UPDATE,
  UPDATE_MOVIE,
} from "../../graphql/queries";
import styles from "./updateById.module.scss";
import { useRef } from "react";

export default function UpdateById() {
  const nameRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const directorRef = useRef<HTMLInputElement>(null);
  const castRef = useRef<HTMLInputElement>(null);
  const ratingRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const releaseRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { id }: any = router.query;

  const { loading, data, error } = useQuery(GET_MOVIE_UPDATE, {
    variables: {
      movieId: parseInt(id),
    },
  });
  const [updateMovie, update] = useMutation(UPDATE_MOVIE, {
    refetchQueries: [
      { query: GET_MOVIE_BY_ID, variables: { movieId: parseInt(id) } },
    ],
  });
  if (loading) return <Loader />;
  if (error) {
    console.log(error);
    return <Loader />;
  }
  if (update.loading) {
    return <UpdateLoader />;
  }
  if (update.error) {
    console.log(update.error.message);
    return <p>UPDATE ERROR</p>;
  }
  if (update.data) {
    router.replace("/");
  }
  const {
    movie_name,
    movie_image,
    movie_description,
    movie_director,
    movie_casts,
    movie_rating,
    movie_type,
    movie_release,
  } = data.getmovie[0];

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = nameRef.current?.value;
    const img = imgRef.current?.currentSrc;
    const description = descriptionRef.current?.value;
    const director = directorRef.current?.value;
    const cast = castRef.current?.value;
    const rating = ratingRef.current!.value;
    const type = typeRef.current?.value;
    const release = releaseRef.current!.value;

    const updateData = {
      ID: parseInt(id),
      movie_name: name,
      movie_image: img,
      movie_description: description,
      movie_director: director,
      movie_casts: cast,
      movie_rating: parseFloat(rating),
      movie_type: type,
      movie_release: parseInt(release),
    };
    console.log(updateData);
    updateMovie({
      variables: {
        movie: updateData,
      },
    });
  }

  return (
    <div className={styles.main_container}>
      <img src={movie_image} ref={imgRef} />
      <form onSubmit={handleSubmit} className={styles.form_container}>
        <input
          placeholder="movie name"
          defaultValue={movie_name}
          ref={nameRef}
        />
        <textarea
          placeholder="movie description"
          defaultValue={movie_description}
          ref={descriptionRef}
        />
        <input
          placeholder="movie director"
          defaultValue={movie_director}
          ref={directorRef}
        />
        <input
          placeholder="movie cast"
          defaultValue={movie_casts}
          ref={castRef}
        />
        <input
          placeholder="movie rating"
          defaultValue={movie_rating}
          type={"number"}
          min="1"
          max="10"
          step={0.5}
          ref={ratingRef}
        />
        <select name="type" defaultValue={movie_type} ref={typeRef}>
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
          ref={releaseRef}
        />
        <button>Update</button>
      </form>
    </div>
  );
}
