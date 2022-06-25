import styles from "./Movie.module.scss";
import { AiFillStar } from "react-icons/ai";

interface Props {
  image: string;
  name: string;
  rating: number | string;
  description?: string;
  director: string;
  casts?: string;
}

export function Movie({
  image,
  name,
  rating,
  director,
  description,
  casts,
}: Props) {
  return (
    <div className={styles.main_container}>
      <img src={image} className={styles.image} />
      <div className={styles.container}>
        <div className={styles.container__name_box}>
          <h3>{name}</h3>
          <div className={styles.rating_box}>
            <AiFillStar style={{ marginRight: 5 }} color="#61892f" />
            {rating}
          </div>
        </div>
        <div>
          <p className={styles.info}>Director - {director}</p>
          {casts && <p className={styles.info}>Casts - {casts}</p>}
        </div>
        <div className={styles.movie_type}>Science Fiction</div>
        {description && <p className={styles.description}>{description}</p>}
        <div className={styles.container__footer_box}></div>
      </div>
    </div>
  );
}
