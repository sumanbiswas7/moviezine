import { useState, useEffect, useRef, KeyboardEvent } from "react";
import styles from "./SearchBox.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { client } from "../../pages/_app";
import { GET_20_MOVIES } from "../../graphql/queries";
import { ClipLoader } from "react-spinners";
import { useLazyQuery } from "@apollo/client";

interface Movie {
  movie_id: number;
  movie_image: string;
  movie_rating: string;
  movie_release: number;
  movie_name: string;
  movie_type: string;
}

export function SearchBox() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [getMovies] = useLazyQuery(GET_20_MOVIES);

  function onSearchEnter(e: KeyboardEvent<HTMLInputElement>) {
    const searchText = searchRef.current?.value;
    const movieCache = client.readQuery({
      query: GET_20_MOVIES,
    });

    if (searchText && e.key == "Enter") {
      setLoading(true);
      if (movieCache) {
        const searchResult = movieCache.randommovies!.filter((m: Movie) => {
          return m.movie_name.toLowerCase().includes(searchText.toLowerCase());
        });
        console.log(searchResult);
        setLoading(false);
      } else {
        getMovies().then((res) => {
          const searchResult = res.data!.randommovies.filter((m: Movie) => {
            return m.movie_name
              .toLowerCase()
              .includes(searchText.toLowerCase());
          });
          console.log(searchResult);
          setLoading(false);
        });
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
