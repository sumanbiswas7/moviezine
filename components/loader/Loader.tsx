import Loading from "react-spinners/HashLoader";
import styles from "./Loader.module.scss";

export function Loader() {
  return (
    <div className={styles.container}>
      {/* <div className={styles.container__logo_img}></div> */}
      <Loading color="#fff" size={50} />
    </div>
  );
}
