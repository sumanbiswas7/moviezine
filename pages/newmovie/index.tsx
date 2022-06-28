import { NavBar } from "../../components/navbar/NavBar";
import styles from "./newmovie.module.scss";
import {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useRef,
  useState,
} from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { ADD_MOVIE, GET_UPLOAD_IMG_URL } from "../../graphql/queries";
import { useRouter } from "next/router";
import { UpdateLoader } from "../../components/loader/Loader";

export default function Movies() {
  const nameRef = useRef<HTMLInputElement>(null);
  const directorRef = useRef<HTMLInputElement>(null);
  const castsRef = useRef<HTMLInputElement>(null);
  const ratingRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const releaseRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const router = useRouter();

  const [previewImg, setPreviewImg] = useState("./upload.jpg");
  const [imgFile, setImgFile] = useState<File | undefined>();
  const [imgChanged, setImgChanged] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [getImgUrl] = useLazyQuery(GET_UPLOAD_IMG_URL, {
    fetchPolicy: "no-cache",
  });
  const [uploadMovie, uploadData] = useMutation(ADD_MOVIE);

  if (uploadData.loading) return <UpdateLoader />;
  if (uploadData.error) console.log(uploadData.error);
  if (uploadData.data) router.replace("/");

  function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUploading(true);
    const name = nameRef.current?.value;
    const description = descriptionRef.current?.value;
    const director = directorRef.current?.value;
    const casts = castsRef.current?.value;
    const rating = ratingRef.current!.value;
    const type = typeRef.current?.value;
    const release = releaseRef.current!.value;
    const img = imgRef.current?.currentSrc;
    if (
      !name ||
      !description ||
      !director ||
      !casts ||
      !rating ||
      !type ||
      !release ||
      !imgChanged
    ) {
      alert("Please note every field is required");
      return;
    }

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
              const movie = {
                movie_name: name,
                movie_description: description,
                movie_director: director,
                movie_casts: casts,
                movie_rating: parseFloat(rating),
                movie_release: parseInt(release),
                movie_type: type,
                movie_image: imageUrl,
                movie_fk: 1, // Suman Biswas
              };
              uploadMovie({
                variables: {
                  movie: movie,
                },
              });
              console.log(`Image Uploaded at - ${imageUrl}`);
              setUploading(false);
            })
            .catch((e) => console.error(e));
        }
      })
      .catch((e) => console.error(e));
  }

  function onImageChange(e: ChangeEvent<HTMLInputElement>) {
    const imgFile = e.target.files![0];
    const imgUrl = URL.createObjectURL(imgFile);
    setImgFile(imgFile);
    setImgChanged(true);
    setPreviewImg(imgUrl);
  }

  return (
    <>
      <NavBar />
      <div className={styles.main_container}>
        <div className={styles.container}>
          <label htmlFor="imgInput" className={styles.img_label}>
            <img src={previewImg} ref={imgRef} />
          </label>
          <input
            type="file"
            name="file"
            id="imgInput"
            accept="image/png, image/jpg, image/jpeg"
            className={styles.image_input}
            onChange={onImageChange}
          />
          <form className={styles.movie_form} onSubmit={submitHandler}>
            <input placeholder="Movie Name *" ref={nameRef} />
            <input placeholder="Movie Director *" ref={directorRef} />
            <input placeholder="Movie Casts *" ref={castsRef} />
            <input
              placeholder="Movie Rating *"
              type={"number"}
              min="1"
              max="10"
              step={0.5}
              ref={ratingRef}
            />
            <select name="Movie Type *" ref={typeRef}>
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
            <textarea placeholder="Movie Description *" ref={descriptionRef} />
            <input
              placeholder="Movie Release *"
              type={"number"}
              min="1900"
              max="2023"
              ref={releaseRef}
            />
            <button disabled={uploading}>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
