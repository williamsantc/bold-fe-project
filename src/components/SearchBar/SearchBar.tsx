import React, { FC } from "react";
import styles from "./SearchBar.module.scss";
import Image from "next/image";

const SearchBar: FC = () => {
    return (
        <div className={styles.searchBar}>
            <label htmlFor="search" className={styles.label}>
                <Image className={styles.icon} src="/search.svg" alt="search icon" width={16} height={16} />
                <input
                    id="search"
                    type="text"
                    placeholder="Buscar"
                    className={styles.input}
                    aria-label="Search transactions"
                />
            </label>
        </div>
    );
};

export default SearchBar;
