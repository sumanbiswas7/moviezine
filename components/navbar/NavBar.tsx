import { Logo } from "../logo/Logo";
import styles from "./NavBar.module.scss";
import { SearchBox } from "../search/SearchBox";
import { NavLinks } from "../navlinks/NavLinks";

export function NavBar() {
  return (
    <nav className={styles.navbar}>
      <Logo />
      <NavLinks />
      <SearchBox />
    </nav>
  );
}
