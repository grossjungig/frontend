import axios from '../../axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import dummyAvatar from '../../assets/images/dummy-avatar.jpg'
import ProfileLocales from "../../locales/locales.profile.json";
import styles from './index.module.css';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { dispatchCheckAuth } from "../../store/auth/thunks";

class Profile extends Component {
  state = {
    profile: [],
    user: ''
  };

  componentDidMount() {
    const profileId = this.props.match.params.id;
    axios.get(`api/profiles/${profileId}`)
      .then((response) => {
        this.setState({
          profile: response.data,
          user: response.data.user
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteProfile = async () => {
    const confirmed = window.confirm('Are you sure?');
    const profileId = this.props.match.params.id;
    if (confirmed) {
      try {
        const { data: { msg } } = await axios.delete(`api/profiles/${profileId}`)
        if (msg === 'profile_deleted') {
          this.props.refreshUser();
          this.props.history.push('/userportal')
          alert('Profile successfully deleted.')
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  render() {
    const profile = this.state.profile;
    const user = this.state.user
    const fetchedUser = this.props.fetchedUser
    const lang = localStorage.getItem("lang");
    let renderedAvatar = dummyAvatar;
    const { avatarUrl } = this.state.profile;
    if (avatarUrl) renderedAvatar = avatarUrl;
    const pets = [<span>{ProfileLocales.pets[lang]}</span>, <span>{profile.pets}</span>]


    return (

      <div className={styles.section}>
          <div className={styles.upperHead}>
            <div className={styles.lineone}>
              <ArrowBackIcon className={styles.arrowBackIcon} onClick={this.props.history.goBack} />
              <span className={styles.view}>{ lang==="en" ? "Go Back" : "Zurück" }</span>
            </div>
            {fetchedUser === null || fetchedUser.profile !== this.props.match.params.id ?
            <div className={styles.info}>
              {ProfileLocales.person[lang]} <span className={styles.red}>info@grossjungig.de</span> { lang==="de" ? "oder" : "or" } <span className={styles.red}>+49-30-55231271</span>
            </div> : null}
          </div>
        
        <div className={styles.main}>

          <div className={styles.leftPortion}>
            <img src={renderedAvatar} alt="avatar" className={styles.pic} />
            <div className={styles.name}>{profile.profileName}</div>
          </div>

          <div className={styles.rightPortion}>
            <div className={styles.mainContent}>
              <div className={styles.about}>
                <div className={styles.heading}>{lang === "en" ? "ABOUT" : "ÜBER"}</div>
                <div className={styles.item}><span>{ProfileLocales.dob[lang]}:  </span><span>{String(profile.dob).split("T")[0]}</span></div>
                <div className={styles.item}><span>{ProfileLocales.gender[lang]}:  </span><span>{profile.gender}</span></div>
                <div className={styles.item}><span>{ProfileLocales.price[lang]}  </span> <span>{profile.price}€</span></div>
                <div className={styles.item}><span>{ProfileLocales.occupation[lang]}:  </span><span>{profile.occupation}</span></div>
                <div className={styles.item}><span>{ProfileLocales.doYouSmoke[lang]}  </span><span>{profile.smoke}</span></div>
                <div className={styles.item}><span>{ProfileLocales.accomodation[lang]}  </span><span>{profile.accomodation}</span></div>

                <div className={styles.item}>{profile.pets ? pets : null}</div>

                <div className={styles.item}> <span> {ProfileLocales.hobbyText[lang]} </span>
                  {profile.length !== 0 && profile.hobbies.map(hobby => (
                    <p> <ArrowForwardIosIcon fontSize="small" /> {hobby} </p>
                  ))}
                </div>

                <div className={styles.item}> <span> {ProfileLocales.helpText[lang]} </span>
                  {profile.length !== 0 && profile.offeredHelp.map(help => (
                    <p> <ArrowForwardIosIcon fontSize="small" /> {help} </p>
                  ))}
                </div>
                <p></p>
              </div>

              <div className={styles.room}>
                <div className={styles.heading}>{lang === "en" ? "ABOUT ROOM" : "ÜBER ZIMMER"}</div>
                <div className={styles.item}><span>{ProfileLocales.Roomsubheading[lang]} </span><span>{profile.rooms}</span></div>
                <div className={styles.item}><span>{ProfileLocales.size[lang]} </span><span>{profile.size}m²</span></div>
                <div className={styles.item}><span>{ProfileLocales.exptdDate[lang]} </span><span>{String(profile.moveInDate).split("T")[0]}</span></div>
                <div className={styles.item}><span>{ProfileLocales.exptdDuration[lang]} </span><span>: {profile.duration}{ProfileLocales.months[lang]}</span></div>
                <div className={styles.item}><span>{ProfileLocales.district[lang]} </span>
                  {profile.length !== 0 && profile.district.map(district => (
                    <p> <ArrowForwardIosIcon fontSize="small" />{district}</p>
                  ))}
                </div>
              </div>


              <div className={styles.roommate}>
                <div className={styles.heading}>{lang === "en" ? "ABOUT THE PERSON TO LIVE WITH" : "ÜBER DIE PERSON, MIT DER SIE LEBEN MÖCHTEN"}</div>
                <div className={styles.item}><span>{ProfileLocales.partner[lang]} </span><span>{profile.idealFlatmate}</span></div>
              </div>

            </div>

            {profile.length !== 0 && fetchedUser !== null && fetchedUser.profile === this.props.match.params.id &&
              <div className={styles.ctrl}>
                <Link to={`/edit/${profile._id}`}>
                  <button className={styles["blue-button"]}>{ProfileLocales.editProfile[lang]}</button>
                </Link>
                <button
                  className={styles.delBtn}
                  onClick={this.deleteProfile}
                >{ProfileLocales.deleteProfile[lang]}</button>
              </div>
            }
          </div>
        </div>

      </div>
    );

  }
}

const mapStateToProps = (reduxState) => ({
  fetchedUser: reduxState.user
});
const mapDispatchToProps = {
  refreshUser: () => dispatchCheckAuth()
};


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
