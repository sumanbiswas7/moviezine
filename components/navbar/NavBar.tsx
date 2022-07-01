import { Logo } from "../logo/Logo";
import styles from "./NavBar.module.scss";
import { SearchBox } from "../search/SearchBox";
import { NavLinks } from "../navlinks/NavLinks";
import { useState } from "react";
import Link from "next/link";

export function NavBar() {
  const [modal, setModal] = useState(false);
  const handleModalClick = () => {
    setModal((p) => !p);
  };

  return (
    <nav className={styles.navbar}>
      <Logo />
      <NavLinks />
      <div className={styles.nav_btn_container}>
        <button onClick={handleModalClick} className={styles.nav_btn}>
          <span className={styles.btn_line_1}></span>
          <span className={styles.btn_line_2}></span>
          <span className={styles.btn_line_3}></span>
        </button>
      </div>
      {modal && (
        <ul className={styles.nav_mobile_links}>
          <Link href={"/"}>
            <li>home</li>
          </Link>
          <Link href={"/movies"}>
            <li>movies</li>
          </Link>
          <Link href={"/newmovie"}>
            <li>new movie</li>
          </Link>
        </ul>
      )}
      <SearchBox />
    </nav>
  );
}
