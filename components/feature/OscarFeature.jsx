import { useState, useEffect } from "react";
import styles from "./OscarFeature.module.scss";
import { AiFillStar } from "react-icons/ai";
export function OscarFeature() {
  return (
    <div className={styles.container}>
      <img src="./oscars.jpg" className={styles.feature_img} />
      <div className={styles.featire_box}>
        <div className={styles.featire_box__rating_box}>
          <p className={styles.featire_box__rating_box__oscar_text}>
            Oscar - 2022
          </p>
          <div className={styles.featire_box__rating_box__star_box}>
            <AiFillStar
              className={styles.featire_box__rating_box__star_box__icon}
            />
            <span className={styles.featire_box__rating_box__star_box__rating}>
              8.5
            </span>
          </div>
        </div>
        <p className={styles.featire_box__description}>
          Ruby is the only hearing member of a deaf family from Gloucester,
          Massachusetts. At 17, she works mornings before school to help her
          parents and brother keep their fishing business afloat ...
        </p>
      </div>
    </div>
  );
}
