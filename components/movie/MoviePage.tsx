import styles from "./MoviePage.module.scss";
import { AiFillStar } from "react-icons/ai";
import Link from "next/link";

interface Props {
  movie_id: number;
  movie_image: string;
  movie_rating: string;
  movie_release: number;
  movie_name: string;
  movie_type: string;
}

export function MoviePage({
  movie_name,
  movie_image,
  movie_type,
  movie_rating,
  movie_release,
  movie_id,
}: Props) {
  return (
    <Link href={`/movies/${movie_id}`}>
      <div className={styles.movie_container}>
        <img src={movie_image} />
        <div className={styles.info_box}>
          <p>{movie_name}</p>
          <p className={styles.movie_type}>{movie_type}</p>
        </div>
        <div className={styles.rating_release_box}>
          <div className={styles.rating_box}>
            <AiFillStar style={{ marginRight: 5 }} color="#61892f" />
            {parseFloat(movie_rating).toFixed(1)}
          </div>
          <div className={styles.movie_release}>{movie_release}</div>
        </div>
      </div>
    </Link>
  );
}
