import React from 'react';
import { NavLink } from "react-router-dom";
import error from "../../assets/icons/error.svg";
import styles from "./errorPage.module.css";
import errorpageLocales from '../../locales/locales.errorpage.json';


const { message, button} = errorpageLocales;

const ErrorPage = () => {
    const lang = localStorage.getItem("lang");
    return (
            <div className={styles.errorDiv}>
                <div className={styles.notfound}>
                    <img src={error} alt="Page Not Found" />
                    <p>{message[lang]}</p>
                    <NavLink to="/">
                    <button className={styles["home-button"]}>
                      {errorpageLocales.button[lang]}
                    </button>
                  </NavLink>
                </div>
            </div>
    )
}

export default ErrorPage
