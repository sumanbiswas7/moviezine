import { MoviePage } from "../../components/movie/MoviePage";
import { NavBar } from "../../components/navbar/NavBar";
import styles from "./movies.module.scss";

export default function Movies() {
  return (
    <>
      <NavBar />
      <MoviePage />
    </>
  );
}
