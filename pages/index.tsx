import type { NextPage } from "next";
import Head from "next/head";
import { NavBar } from "../components/navbar/NavBar";
import styles from "../styles/Home.module.scss";
import { OscarFeature } from "../components/feature/OscarFeature";
import { Movie } from "../components/movie/MoviePic";
import { useQuery } from "@apollo/client";
import { SIX_RANDOM_MOVIES } from "../graphql/queries";
import { Loader } from "../components/loader/Loader";

interface Movie {
  movie_id: number;
  movie_image: string;
  movie_rating: string;
}

const Home: NextPage = () => {
  const { loading, data, error } = useQuery(SIX_RANDOM_MOVIES);
  if (loading) return <Loader />;
  if (error) {
    console.log(error);
    return <p>{error.message}</p>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>moviezine</title>
        <meta name="moviezine" content="get mind-blowing movie suggestions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <NavBar />
        <div className={styles.container}>
          <div className={styles.container__1}>
            <div className={styles.container__1__col}>
              {data.randommovies.slice(0, 2).map((item: Movie) => {
                return (
                  <Movie
                    key={item.movie_id}
                    imgUrl={item.movie_image}
                    id={item.movie_id}
                    rating={item.movie_rating}
                  />
                );
              })}
            </div>
            <div className={styles.container__1__col}>
              {data.randommovies.slice(2, 4).map((item: Movie) => {
                return (
                  <Movie
                    key={item.movie_id}
                    imgUrl={item.movie_image}
                    id={item.movie_id}
                    rating={item.movie_rating}
                  />
                );
              })}
            </div>
            <div className={styles.container__1__col}>
              {data.randommovies.slice(4, 6).map((item: Movie) => {
                return (
                  <Movie
                    key={item.movie_id}
                    imgUrl={item.movie_image}
                    id={item.movie_id}
                    rating={item.movie_rating}
                  />
                );
              })}
            </div>
          </div>
          <div className={styles.container__2}>
            <OscarFeature />
          </div>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
