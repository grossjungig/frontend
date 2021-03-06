import React, { Component } from "react";
import axios from '../../axios';
import dummyAvatar from '../../assets/images/dummy-avatar.jpg';
import RoomTwoToneIcon from '@material-ui/icons/RoomTwoTone';
import EventAvailableTwoToneIcon from '@material-ui/icons/EventAvailableTwoTone';
import MeetingRoomTwoToneIcon from '@material-ui/icons/MeetingRoomTwoTone';
import EuroSymbolTwoToneIcon from '@material-ui/icons/EuroSymbolTwoTone';
import styles from './index.module.css';
import peopleLocales from "../../locales/locales.people.json";
import Spinner from "../Spinner"

export default class People extends Component {
  state = {
    people: [],
  };

  async componentDidMount() {
    const response = await axios.get('api/profiles');

    this.setState({
      people: response.data.profiles,
    });
  }

  handleClick(_id) {
    this.props.history.push(`/profile/${_id}`);
  }

  toAge = (a) => {
    var today = new Date();
    var birthDate = new Date(a);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())){
          age--;
    }
    return age;
  }

  render() {
    const lang = localStorage.getItem("lang");
    if(this.state.people.length!==0){
    return (
      <>
        <div className={styles.offersTitle}>
          <h1>
            {peopleLocales.people[lang]} Berlin {this.state.people.length} {peopleLocales.offers[lang]}
          </h1>
        </div>
        <ul className={styles["profile-card-container"]}>
          {this.state.people.map((profile) => {
            return (
              <li
                className={styles["profile-card"]}
                onClick={() => this.handleClick(profile._id)}
                key={profile._id}
              >
                <div className={styles["profile-card__avatar"]}>
                  <img src={profile.avatarUrl || dummyAvatar} alt="person" />
                </div>
                <div className={styles["profile-card__content"]}>
                  {/* <h3>{capitalizeFirstLetter(profile.name)}, {profile.age}</h3> */}
                  <h3 className={styles["heading"]}>Bipul,  {this.toAge(profile.dob)}</h3>
                  <div>
                    <span className={styles["profile-card__district"]}><RoomTwoToneIcon fontSize="small" className={styles["icons"]} />  <span className={styles.berlinFixed}>Berlin</span>  {profile.district.map(district => (
                      <span className={styles["districts-list"]}>, {district}</span>
                    ))}</span>
                    <div className={styles["profile-card__item"]}><MeetingRoomTwoToneIcon fontSize="small" className={styles["icons"]} />  {profile.size}m²</div>
                    <div className={styles["profile-card__item"]}><EventAvailableTwoToneIcon fontSize="small" className={styles["icons"]} />  {lang === "en" ? "Move In:" : "Einziehen:"} {profile.moveInDate}</div>
                    <div className={styles["profile-card__item"]}><EuroSymbolTwoToneIcon fontSize="small" className={styles["icons"]} />{peopleLocales.can_pay[lang]}  {profile.price}€  ({peopleLocales.monthly[lang]})</div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </>
    );
      }
      else return <Spinner/>
  }
}
