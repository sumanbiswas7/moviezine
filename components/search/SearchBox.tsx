import { useState, useEffect, useRef, KeyboardEvent } from "react";
import styles from "./SearchBox.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { client } from "../../pages/_app";
import { GET_20_MOVIES } from "../../graphql/queries";
import { ClipLoader } from "react-spinners";
export function SearchBox() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  function onSearchEnter(e: KeyboardEvent<HTMLInputElement>) {
    const searchTex = searchRef.current?.value;
    const movieCache = client.readQuery({
      query: GET_20_MOVIES,
    });

    if (searchTex && e.key == "Enter") {
      setLoading(true);
      if (movieCache) {
        console.log(searchTex, e.key);
      }
    }
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.search_input}
        placeholder="search"
        onKeyDown={onSearchEnter}
        ref={searchRef}
        disabled={loading}
      />
      {loading ? (
        <div className={styles.search_icon}>
          <ClipLoader color="#FFF" size={15} />
        </div>
      ) : (
        <AiOutlineSearch className={styles.search_icon} size={18} />
      )}
    </div>
  );
}
