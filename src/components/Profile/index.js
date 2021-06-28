import axios from '../../axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import dummyAvatar from '../../assets/images/dummy-avatar.jpg'
import ProfileLocales from "../../locales/locales.profile.json";
import styles from './index.module.css';
import { fullBlock } from '../../shared/index.module.css'
import { dispatchCheckAuth } from "../../store/auth/thunks";

class Profile extends Component {
  state = {
    profile: [],
  };

  componentDidMount() {
    const profileId = this.props.match.params.id;
    axios.get(`api/profiles/${profileId}`)
      .then((response) => {
        this.setState({ profile: response.data});
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
    const user = this.props.fetchedUser;
    const lang = localStorage.getItem("lang");
    let renderedAvatar = dummyAvatar;
    const { avatarUrl } = this.state.profile;
    if (avatarUrl) renderedAvatar = avatarUrl;
    const pets = [<span>{ProfileLocales.pets[lang]}</span>,<span>{profile.pets}</span>]
    
    
    return (
      <div className={fullBlock}>
        <div className={styles.main}>
          <div className={styles.msg}>
          {ProfileLocales.request[lang]}     
          </div>
          
          <img src={renderedAvatar} alt="avatar" className={styles.pic} />

          <div>
            <span>{ProfileLocales.about[lang]}</span>
            <div><span>{ProfileLocales.dob[lang]}</span><span>{profile.dob}</span></div>
            <div><span>{ProfileLocales.gender[lang]}</span><span>{profile.gender}</span></div>
            <div><span>{ProfileLocales.price[lang]}</span> <span>{profile.price}€</span></div>
            <div><span>{ProfileLocales.occupation[lang]}</span><span>{profile.occupation}</span></div>
            <div><span>{ProfileLocales.doYouSmoke[lang]}</span><span>{profile.smoke}</span></div>
            <div><span>{ProfileLocales.accomodation[lang]}</span><span>{profile.accomodation}</span></div>

            <div>{profile.pets ? pets : null }</div>

            <span>{ProfileLocales.hobbyText[lang]}
            {profile.length !== 0 && profile.hobbies.map(hobby => (
              <span>-{hobby } </span>
            ))}
            </span>

            <span>{ProfileLocales.helpText[lang]}
            {profile.length !== 0 && profile.offeredHelp.map(help => (
              <span> -{help} </span>
            ))}
            </span>
            <p></p>
            <div>About Room</div>
            <div><span>{ProfileLocales.Roomsubheading[lang]}</span><span>{profile.rooms}</span></div>
            <div><span>{ProfileLocales.size[lang]}</span><span>{profile.size}</span></div>
            <div><span>{ProfileLocales.exptdDate[lang]}</span><span>{profile.moveInDate}</span></div>
            <div><span>{ProfileLocales.exptdDuration[lang]}</span><span>{profile.duration}</span></div>
            <span>{ProfileLocales.district[lang]}
            {profile.length !== 0 && profile.district.map(district => (
              <span>-{district }</span>
            ))}
              </span>

            <p></p>
            <div>About the person to live with</div>
            <div><span>{ProfileLocales.partner[lang]}</span><span>{profile.idealFlatmate}</span></div>
            
          </div>
          {profile.length !== 0 && user !==null && user.profile === this.props.match.params.id &&
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
