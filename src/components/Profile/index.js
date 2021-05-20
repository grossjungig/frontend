import axios from '../../axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import dummyAvatar from '../../assets/images/dummy-avatar.jpg'
import ProfileLocales from "../../locales/locales.profile.json";
import styles from './index.module.css';
import { fullBlock } from '../../shared/index.module.css'

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

    let renderedAvatar = dummyAvatar;
    const { avatarUrl } = this.state.profile;
    if (avatarUrl) renderedAvatar = avatarUrl;
    
    return (
      <div className={fullBlock}>
        <div className={styles.main}>
          <div className={styles.msg}>
          {ProfileLocales.request[lang]}     
               </div>
          
          <img src={renderedAvatar} alt="avatar" className={styles.pic} />

          <div className={styles.details}>
            <span>{ProfileLocales.name[lang]}</span><span>{profile.name}</span>
            <span>{ProfileLocales.age[lang]}</span><span>{profile.age}</span>
            <span>{ProfileLocales.gender[lang]}</span><span>{profile.gender}</span>
            <span>{ProfileLocales.pays[lang]}</span> <span>{profile.price}€</span>
            <span>{ProfileLocales.would_live[lang]}</span><span>{profile.district}</span>
            <span>{ProfileLocales.help_with[lang]}</span>
            <span>
              {profile.length !== 0 && profile.help.map(
                help => <span key = {help}> -{help} </span>)
              }
            </span>
            <span>Bio</span>
            <span className={styles.bio} >"{profile.description}"</span>
          </div>
          {profile.length !== 0 && user !==null && user.profile === this.props.match.params.id &&
            <div className={styles.ctrl}>
              <Link to={`/edit/${profile._id}`}>
                <button className={styles.btn}>{ProfileLocales.editProfile[lang]}</button>
              </Link>
              <button 
                className={`${styles.btn} ${styles.delBtn}`}
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

export default connect(mapStateToProps)(Profile);
