import React, { FC } from "react";
import styles from "./SearchBar.module.scss";
import Image from "next/image";

type SearchBarProps = {
    freeText?: string;
    setFreeText: (text: string) => void;
};

const SearchBar: FC<SearchBarProps> = ({ setFreeText, freeText }) => {
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
                    value={freeText}
                    onChange={(e) => setFreeText(e.target.value)}
                />
            </label>
        </div>
    );
};

export default SearchBar;
