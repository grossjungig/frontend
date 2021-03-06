import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import portalLocales from "../../locales/locales.portal.json";
import { connect } from "react-redux";

import styles from './index.module.css';
import { fullBlock } from '../../shared/index.module.css';

const UserPortal = (props) => {
  const lang = localStorage.getItem("lang");
  const [user, setUser] = useState({ name: "" });

  useEffect(() => {
    setUser((prev) => {
      if (props.fetchedUser) return props.fetchedUser;
      return prev;
    });
  }, [props.fetchedUser]);

  let renderedLinks;
  if (user.role === "senior") {
    renderedLinks =[<Link to="/people">
    <button className={styles.btn}>{portalLocales.people[lang]}</button>
    </Link>, 
    <Link to="/addroom">
      <button className={styles.btn}>
        {portalLocales.add[lang]}
      </button>
    </Link>,   ];
  } else {
    // role = junior
    if (!user.profile) {
      renderedLinks = [ 
      <Link to="/berlin">
          <button className={styles.btn}>{portalLocales.rooms[lang]}</button>
      </Link>,
      <Link to="/addprofile">
      <div>
        <button className={styles.btn}>
          {portalLocales.profile[lang]}
        </button>
      </div>
    </Link>];
    } else {
      renderedLinks = [
      <Link to="/berlin">
      <button className={styles.btn}>{portalLocales.rooms[lang]}</button>
      </Link>,
      <Link to={`profile/${user.profile}`}>
        <button className={styles.btn}>
          {portalLocales.profile2[lang]}{" "}
        </button>
      </Link>];
    }
  }

  return (
    <div className={fullBlock}>
      <div className={styles.main}>
        <h1 className={styles.title}>{portalLocales.greeting[lang]} {user.name}!</h1>
        {renderedLinks}
      </div>
    </div>
  );
};

const mapStateToProps = (reduxState) => {
  return {
    fetchedUser: reduxState.user,
  };
};

export default connect(mapStateToProps)(UserPortal);
