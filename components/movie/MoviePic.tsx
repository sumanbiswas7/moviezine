import styles from "./MoviePic.module.scss";
import Link from "next/link";

interface Props {
  imgUrl: string | null;
  id: number;
  rating: number;
}
export function Movie({ imgUrl, id, rating }: Props) {
  const nullImgUrl =
    "https://movizine-imageupload.s3.ap-south-1.amazonaws.com/404_image_not_found.jpg";

  return (
    <Link href={`/${id}`}>
      <div className={styles.movie_box}>
        {imgUrl == null || imgUrl == "" ? (
          <img src={nullImgUrl} className={styles.movie_box__img} />
        ) : (
          <img src={imgUrl} className={styles.movie_box__img} />
        )}
        {rating && <div className={styles.movie_box__rating_box}>{rating}</div>}
      </div>
    </Link>
  );
}
