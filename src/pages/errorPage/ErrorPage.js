import React from 'react';
import { NavLink } from "react-router-dom";
import error from "../../assets/icons/error.svg";
import "./errorPage.css";
import errorpageLocales from '../../locales/locales.errorpage.json';


const { message, button} = errorpageLocales;

const ErrorPage = () => {
    const lang = localStorage.getItem("lang");
    return (
        <>
            <div id="notfound">
                <div className="notfound">

                    <img src={error} alt="Page Not Found" />


                    <p>{message[lang]}</p>

                    <NavLink to="/to">
                    <button className="home-button">
                      {errorpageLocales.button[lang]}
                    </button>
                  </NavLink>



                </div>
            </div>


        </>
    )
}

export default ErrorPage
