import styles from "./MoviePic.module.scss";
interface Props {
  imgUrl: string | null;
}
export function Movie({ imgUrl }: Props) {
  const nullImgUrl =
    "https://movizine-imageupload.s3.ap-south-1.amazonaws.com/404_image_not_found.jpg";
  return (
    <div className={styles.movie_box}>
      {imgUrl == null || imgUrl == "" ? (
        <img src={nullImgUrl} className={styles.movie_box__img} />
      ) : (
        <img src={imgUrl} className={styles.movie_box__img} />
      )}
    </div>
  );
}
