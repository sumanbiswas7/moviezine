import styles from "./NavLinks.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

export function NavLinks() {
  const { pathname } = useRouter();
  return (
    <div className={styles.link_container}>
      <Link href={"/"}>
        <a
          className={
            pathname == "/"
              ? styles.link_container__active_link
              : styles.link_container__link
          }
        >
          home
        </a>
      </Link>
      <Link href={"/movies"}>
        <a
          className={
            pathname == "/movies"
              ? styles.link_container__active_link
              : styles.link_container__link
          }
        >
          movies
        </a>
      </Link>
      <Link href={"/newmovie"}>
        <a
          className={
            pathname == "/newmovie"
              ? styles.link_container__active_link
              : styles.link_container__link
          }
        >
          new movie
        </a>
      </Link>
    </div>
  );
}
