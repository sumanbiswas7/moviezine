import { useState, useRef, KeyboardEvent } from "react";
import styles from "./SearchBox.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/router";

export function SearchBox() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function onSearchEnter(e: KeyboardEvent<HTMLInputElement>) {
    const searchText = searchRef.current?.value;
    if (searchText && e.key == "Enter") {
      // router.push(`/search/${searchText}`);
      router.push({
        pathname: "/search",
        query: { text: searchText },
      });
      setLoading(false);
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
