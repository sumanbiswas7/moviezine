import { useRouter } from "next/router";
import { NavBar } from "../../components/navbar/NavBar";
import { UpdateLoader } from "../../components/loader/Loader";
import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { client } from "../_app";
import { GET_20_MOVIES } from "../../graphql/queries";

interface Movie {
  movie_id: number;
  movie_image: string;
  movie_rating: string;
  movie_release: number;
  movie_name: string;
  movie_type: string;
}

export default function Search() {
  const router = useRouter();
  const [getMovies] = useLazyQuery(GET_20_MOVIES);
  const [loading, setLoading] = useState(false);

  const movieCache = client.readQuery({
    query: GET_20_MOVIES,
  });

  useEffect(() => {
    runSearch();

    function runSearch() {
      setLoading(true);
      const searchText: any = router.query.text;
      if (!searchText) {
        setLoading(false);
        return;
      }

      if (movieCache) {
        const searchResult = movieCache.randommovies!.filter((m: Movie) => {
          return m.movie_name.toLowerCase().includes(searchText!.toLowerCase());
        });
        console.log(searchResult);
        setLoading(false);
      } else {
        getMovies().then((res) => {
          const searchResult = res.data!.randommovies.filter((m: Movie) => {
            return m.movie_name
              .toLowerCase()
              .includes(searchText!.toLowerCase());
          });
          console.log(searchResult);
          setLoading(false);
        });
      }
    }
  }, [router.asPath]);

  if (loading) return <UpdateLoader />;

  return (
    <>
      <NavBar />
      <div>
        <div>Hi</div>
      </div>
    </>
  );
}
