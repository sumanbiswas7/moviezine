import styles from "./MoviePic.module.scss";
import Router from "next/router";

interface Props {
  imgUrl: string | null;
  id: number;
}
export function Movie({ imgUrl, id }: Props) {
  const nullImgUrl =
    "https://movizine-imageupload.s3.ap-south-1.amazonaws.com/404_image_not_found.jpg";

  function onButtonClick(id: number) {
    Router.push(`/${id}`);
  }

  return (
    <button onClick={() => onButtonClick(id)} className={styles.movie_box}>
      {imgUrl == null || imgUrl == "" ? (
        <img src={nullImgUrl} className={styles.movie_box__img} />
      ) : (
        <img src={imgUrl} className={styles.movie_box__img} />
      )}
    </button>
  );
}
