import { useState, useEffect } from "react";
import styles from "./SearchBox.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
export function SearchBox() {
  return (
    <div className={styles.container}>
      <input className={styles.search_input} placeholder="search" />
      <AiOutlineSearch className={styles.search_icon} size={18} />
    </div>
  );
}
