import Link from "next/link";
import styles from "./Logo.module.scss";

export function Logo() {
  return (
    <Link href={"/"}>
      <div className={styles.logo_container}>
        <img src="./logo.svg" className={styles.logo_img} />
        <p className={styles.logo_text}>moviezine</p>
      </div>
    </Link>
  );
}
