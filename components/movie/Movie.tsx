import styles from "./Movie.module.scss";
import { AiFillStar } from "react-icons/ai";

interface Props {
  image: string;
  name: string;
  rating: number | string;
  description: string;
  director: string;
}

export function Movie({ image, name, rating, director, description }: Props) {
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
        <p>Director - {director}</p>
        <p className={styles.description}>{description}</p>
        <div className={styles.container__footer_box}></div>
      </div>
    </div>
  );
}
