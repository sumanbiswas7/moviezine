import Loading from "react-spinners/HashLoader";
import BeatLoader from "react-spinners/BeatLoader";
import styles from "./Loader.module.scss";

export function Loader() {
  return (
    <div className={styles.container}>
      {/* <div className={styles.container__logo_img}></div> */}
      <Loading color="#fff" size={50} />
    </div>
  );
}
export function UpdateLoader() {
  return (
    <div className={styles.container}>
      <BeatLoader color="#fff" size={15} />
    </div>
  );
}
