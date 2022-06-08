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
      <Link href={"/topmovies"}>
        <a
          className={
            pathname == "/topmovies"
              ? styles.link_container__active_link
              : styles.link_container__link
          }
        >
          top movies
        </a>
      </Link>
      <Link href={"/suggestions"}>
        <a
          className={
            pathname == "/suggestions"
              ? styles.link_container__active_link
              : styles.link_container__link
          }
        >
          suggestions
        </a>
      </Link>
    </div>
  );
}
