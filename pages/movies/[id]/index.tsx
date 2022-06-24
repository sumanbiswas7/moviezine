import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Loader } from "../../../components/loader/Loader";
import { GET_MOVIE_BY_ID } from "../../../graphql/queries";
import styles from "./moviesById.module.scss";

export default function Id() {
  const { id }: any = useRouter().query;
  const { data, loading, error } = useQuery(GET_MOVIE_BY_ID, {
    variables: { movieId: parseInt(id) },
  });
  if (loading) return <Loader />;
  if (error) {
    console.log(error);
    return <Loader />;
  }

  if (data) console.log(data.getmovie[0]);

  return (
    <div>
      <li>Work in progress</li>
    </div>
  );
}
