import axios from '../../axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import dummyAvatar from '../../assets/images/dummy-avatar.jpg'
import ProfileLocales from "../../locales/locales.profile.json";
import styles from './index.module.css';
import HomeIcon from '@material-ui/icons/Home';
import FaceIcon from '@material-ui/icons/Face';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

class Profile extends Component {
  state = {
    profile: [],
  };

  componentDidMount() {
    const profileId = this.props.match.params.id;
    axios.get(`api/profiles/${profileId}`)
      .then((response) => {
        this.setState({ profile: response.data });
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
    const user = this.props.fetchedUser;
    const lang = localStorage.getItem("lang");
    let renderedAvatar = dummyAvatar;
    const { avatarUrl } = this.state.profile;
    if (avatarUrl) renderedAvatar = avatarUrl;
    const pets = [<span>{ProfileLocales.pets[lang]}</span>, <span>{profile.pets}</span>]


    return (

      <div className={styles.section}>
        <div className={styles.msg}>
          {lang === "en" ? "My Profile" : "Mein Profil"}
        </div>
        <div className={styles.main}>

          <div className={styles.leftPortion}>
            <img src={renderedAvatar} alt="avatar" className={styles.pic} />
            <div className={styles.name}>erfyeggy</div>
          </div>

          <div className={styles.rightPortion}>
            <div className={styles.mainContent}>
              <div className={styles.about}>
                <div className={styles.heading}><FaceIcon />{lang==="en" ? "About" : "Über"}</div>
                <div className={styles.item}><span>{ProfileLocales.dob[lang]}:  </span><span>{String(profile.dob).split("T")[0]}</span></div>
                <div className={styles.item}><span>{ProfileLocales.gender[lang]}:  </span><span>{profile.gender}</span></div>
                <div className={styles.item}><span>{ProfileLocales.price[lang]}  </span> <span>{profile.price}€</span></div>
                <div className={styles.item}><span>{ProfileLocales.occupation[lang]}:  </span><span>{profile.occupation}</span></div>
                <div className={styles.item}><span>{ProfileLocales.doYouSmoke[lang]}  </span><span>{profile.smoke}</span></div>
                <div className={styles.item}><span>{ProfileLocales.accomodation[lang]}  </span><span>{profile.accomodation}</span></div>

                <div className={styles.item}>{profile.pets ? pets : null}</div>

                <div className={styles.item}> <span> {ProfileLocales.hobbyText[lang]} </span>  
                  {profile.length !== 0 && profile.hobbies.map(hobby => (
                    <p> <ArrowForwardIosIcon fontSize="small"/> {hobby} </p>
                  ))}
                </div>

                <div className={styles.item}> <span> {ProfileLocales.helpText[lang]} </span>  
                  {profile.length !== 0 && profile.offeredHelp.map(help => (
                    <p> <ArrowForwardIosIcon fontSize="small"/> {help} </p>
                  ))}
                </div>
                <p></p>
              </div>

              <div className={styles.room}>
                <div className={styles.heading}><HomeIcon/>{lang==="en" ? "About Room" : "Über Zimmer"}</div>
                <div className={styles.item}><span>{ProfileLocales.Roomsubheading[lang]} </span><span>{profile.rooms}</span></div>
                <div className={styles.item}><span>{ProfileLocales.size[lang]} </span><span>{profile.size}m²</span></div>
                <div className={styles.item}><span>{ProfileLocales.exptdDate[lang]} </span><span>{profile.moveInDate}</span></div>
                <div className={styles.item}><span>{ProfileLocales.exptdDuration[lang]} </span><span>{profile.duration}</span></div>
                <div className={styles.item}><span>{ProfileLocales.district[lang]} </span>
                  {profile.length !== 0 && profile.district.map(district => (
                    <p> <ArrowForwardIosIcon fontSize="small"/>{district}</p>
                  ))}
                </div>
              </div>


              <div className={styles.roommate}>
                <div className={styles.heading}><EmojiPeopleIcon/>{lang==="en" ? "About the person to live with" : "Über die Person, mit der Sie leben möchten"}</div>
                <div className={styles.item}><span>{ProfileLocales.partner[lang]} </span><span>{profile.idealFlatmate}</span></div>
              </div>

            </div>

            {profile.length !== 0 && user !== null && user.profile === this.props.match.params.id &&
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

export default connect(mapStateToProps)(Profile);
