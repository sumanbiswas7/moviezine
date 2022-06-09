import type { NextPage } from "next";
import Head from "next/head";
import { NavBar } from "../components/navbar/NavBar";
import styles from "../styles/Home.module.scss";
import { OscarFeature } from "../components/feature/OscarFeature";

const Home: NextPage = () => {
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
          <div className={styles.container__1}></div>
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
