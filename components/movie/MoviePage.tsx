import styles from "./MoviePage.module.scss";

const dummy = {
  movie_image:
    "https://movizine-imageupload.s3.ap-south-1.amazonaws.com/2be9946153f96c799710ee4080723ea8.jpg",
  movie_name: "The Matrix",
  movie_rating: 8,
  movie_release: 1999,
  movie_type: "Science Fiction",
};

export function MoviePage() {
  return (
    <div className={styles.movie_container}>
      <img src={dummy.movie_image} />
      <div className={styles.info_box}>
        <p>{dummy.movie_name}</p>
        <p>{dummy.movie_type}</p>
      </div>
      <div className={styles.rating_release_box}>
        <div>{dummy.movie_rating}</div>
        <div>{dummy.movie_release}</div>
      </div>
    </div>
  );
}
