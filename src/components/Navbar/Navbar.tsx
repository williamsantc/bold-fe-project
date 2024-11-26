import { FC } from 'react';
import Image from 'next/image';
import styles from './Navbar.module.scss';

const Navbar: FC = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logoContainer}>
                <Image
                    className={styles.logo}
                    src="/bold-logo.svg"
                    alt="Bold logo"
                    width={180}
                    height={38}
                    priority
                />
            </div>
            <div className={styles.links}>
                <a href="#" className={styles.link}>Mi negocio</a>
                <a href="#" className={styles.link}>Ayuda</a>
            </div>
        </nav>
    );
};

export default Navbar;
