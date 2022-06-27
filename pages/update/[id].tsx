import {
  ApolloError,
  useLazyQuery,
  useMutation,
  useQuery,
} from "@apollo/client";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Loader, UpdateLoader } from "../../components/loader/Loader";
import {
  GET_MOVIE_BY_ID,
  GET_MOVIE_UPDATE,
  GET_UPLOAD_IMG_URL,
  UPDATE_MOVIE,
} from "../../graphql/queries";
import styles from "./updateById.module.scss";
import { useRef } from "react";

export default function UpdateById() {
  const nameRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const directorRef = useRef<HTMLInputElement>(null);
  const castRef = useRef<HTMLInputElement>(null);
  const ratingRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const releaseRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { id }: any = router.query;
  const [previewImg, setPreviewImg] = useState();
  const [changed, setChanged] = useState(false);
  const [imgFile, setImgFile] = useState<File | undefined>();

  const getmovie = useQuery(GET_MOVIE_UPDATE, {
    variables: {
      movieId: parseInt(id),
    },
  });
  const [updateMovie, update] = useMutation(UPDATE_MOVIE, {
    refetchQueries: [
      { query: GET_MOVIE_BY_ID, variables: { movieId: parseInt(id) } },
    ],
  });
  const [getImgUrl] = useLazyQuery(GET_UPLOAD_IMG_URL, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (getmovie.data) {
      setPreviewImg(getmovie.data.getmovie[0].movie_image);
    }
  }, [getmovie.data]);

  if (getmovie.loading) return <Loader />;
  if (getmovie.error) return <Loader />;
  if (update.loading) return <UpdateLoader />;
  if (update.error) return <p>UPDATE ERROR</p>;
  if (update.data) router.replace("/");
  const {
    movie_name,
    movie_image,
    movie_description,
    movie_director,
    movie_casts,
    movie_rating,
    movie_type,
    movie_release,
  } = getmovie.data.getmovie[0];

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = nameRef.current?.value;
    const img = imgRef.current?.currentSrc;
    const description = descriptionRef.current?.value;
    const director = directorRef.current?.value;
    const cast = castRef.current?.value;
    const rating = ratingRef.current!.value;
    const type = typeRef.current?.value;
    const release = releaseRef.current!.value;

    if (changed) {
      getImgUrl()
        .then((res) => {
          const uploadUrl = res.data.uploadimage.url;
          uploadImagetoS3(imgFile!, uploadUrl);

          async function uploadImagetoS3(file: File, uploadUrl: string) {
            // post the image direclty to the s3 bucket
            await fetch(uploadUrl, {
              method: "PUT",
              headers: {
                "Content-Type": "multipart/form-data",
              },
              body: file,
            })
              .then(() => {
                const imageUrl = uploadUrl.split("?")[0];
                console.log(`Image Uploaded at - ${imageUrl}`);

                const updateData = {
                  ID: parseInt(id),
                  movie_name: name,
                  movie_image: imageUrl,
                  movie_description: description,
                  movie_director: director,
                  movie_casts: cast,
                  movie_rating: parseFloat(rating),
                  movie_type: type,
                  movie_release: parseInt(release),
                };
                console.log(updateData);
                updateMovie({
                  variables: {
                    movie: updateData,
                  },
                });
              })
              .catch((e) => console.error(e));
          }
        })
        .catch((err) => console.log(err));
    } else {
      const updateData = {
        ID: parseInt(id),
        movie_name: name,
        movie_image: img,
        movie_description: description,
        movie_director: director,
        movie_casts: cast,
        movie_rating: parseFloat(rating),
        movie_type: type,
        movie_release: parseInt(release),
      };
      console.log(updateData);
      updateMovie({
        variables: {
          movie: updateData,
        },
      });
    }
  }

  function onImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files![0];
    const img_url: any = URL.createObjectURL(file);
    setPreviewImg(img_url);
    setImgFile(file);
    setChanged(true);
  }

  return (
    <div className={styles.main_container}>
      <input
        type="file"
        name="file"
        id="imgInput"
        accept="image/png, image/jpg, image/jpeg"
        className={styles.image_input}
        onChange={onImageChange}
      />
      <label
        className={styles.img_input_label}
        style={{ color: "#999999" }}
        htmlFor="imgInput"
      >
        <img src={previewImg} ref={imgRef} />
      </label>
      <form onSubmit={handleSubmit} className={styles.form_container}>
        <input
          placeholder="movie name"
          defaultValue={movie_name}
          ref={nameRef}
        />
        <textarea
          placeholder="movie description"
          defaultValue={movie_description}
          ref={descriptionRef}
        />
        <input
          placeholder="movie director"
          defaultValue={movie_director}
          ref={directorRef}
        />
        <input
          placeholder="movie cast"
          defaultValue={movie_casts}
          ref={castRef}
        />
        <input
          placeholder="movie rating"
          defaultValue={movie_rating}
          type={"number"}
          min="1"
          max="10"
          step={0.5}
          ref={ratingRef}
        />
        <select name="type" defaultValue={movie_type} ref={typeRef}>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Horror">Horror</option>
          <option value="Mystery">Mystery</option>
          <option value="Romance">Romance</option>
          <option value="Thriller">Thriller</option>
          <option value="Western">Western</option>
        </select>
        <input
          placeholder="movie release"
          defaultValue={movie_release}
          type={"number"}
          min="1900"
          max="2023"
          ref={releaseRef}
        />
        <button>Update</button>
      </form>
    </div>
  );
}
