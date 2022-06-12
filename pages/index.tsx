import type { NextPage } from "next";
import Head from "next/head";
import { NavBar } from "../components/navbar/NavBar";
import styles from "../styles/Home.module.scss";
import { OscarFeature } from "../components/feature/OscarFeature";
import { Movie } from "../components/movie/MoviePic";
import { useQuery } from "@apollo/client";
import { SIX_RANDOM_MOVIES } from "../graphql/queries";
import { useEffect, useState } from "react";

const DUMMY_DATA = [
  {
    movie_image:
      "https://movizine-imageupload.s3.ap-south-1.amazonaws.com/f2a294a57a3f9f2786ea583a0485cea8",
    movie_id: 8,
  },
  {
    movie_image:
      "https://movizine-imageupload.s3.ap-south-1.amazonaws.com/f2a294a57a3f9f2786ea583a0485cea8",
    movie_id: 9,
  },
];

const Home: NextPage = () => {
  const { loading, data, error } = useQuery(SIX_RANDOM_MOVIES);
  if (loading) return <p>{loading}</p>;
  if (error) return <p>{error.message}</p>;

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
              {data.randommovies.slice(0, 2).map((item) => {
                return (
                  <>
                    <Movie key={item.movie_id} imgUrl={item.movie_image} />
                  </>
                );
              })}
            </div>
            <div className={styles.container__1__col}>
              {data.randommovies.slice(2, 4).map((item) => {
                return (
                  <>
                    <Movie key={item.movie_id} imgUrl={item.movie_image} />
                  </>
                );
              })}
            </div>
            <div className={styles.container__1__col}>
              {data.randommovies.slice(4, 6).map((item) => {
                return (
                  <>
                    <Movie key={item.movie_id} imgUrl={item.movie_image} />
                  </>
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
