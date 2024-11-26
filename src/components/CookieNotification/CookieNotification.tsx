'use client';

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import styles from "./CookieNotification.module.scss";
import { CookieKey } from "@/lib/constants/cookie";

const CookieNotification = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAcceptedCookies = Cookies.get(CookieKey.ACCEPTED_COOKIES);
    if (!hasAcceptedCookies) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set(CookieKey.ACCEPTED_COOKIES, "true", { expires: 365 });
    setIsVisible(false);
  };

  const handleReject = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.notification}>
      <div className={styles.content}>
        <p>Este sitio utiliza cookies para mejorar la experiencia del usuario.</p>
        <div className={styles.actions}>
          <button onClick={handleAccept} className={styles.acceptButton}>
                        Aceptar
          </button>
          <button onClick={handleReject} className={styles.rejectButton}>
                        Rechazar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieNotification;
