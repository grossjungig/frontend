import axios from '../../axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './index.module.css';
import dummyAvatar from '../../assets/images/dummy-avatar.jpg'

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

  deleteProfile = () => {
    const confirmed = window.confirm('Are you sure?');
    const profileId = this.props.match.params.id;
    if (confirmed) {
      axios.delete(`api/profiles/${profileId}`)
      .then(({data}) => {
        const deleted = data.deletedCount === 1;
      })
      .catch(function (err) {
        console.log(err);
      });
    }
  };

  render() {
    const profile = this.state.profile;
    const user = this.props.fetchedUser;

    let renderedAvatar = dummyAvatar;
    const { avatarUrl } = this.state.profile;
    if (avatarUrl) renderedAvatar = avatarUrl;
    
    return (
      <div className="full-block">
        <div className={styles.profile}>
          <div className={styles['profile__msg']}>
            If you are interested in this request, please contact info@grossjungig.de or +49 30 55231271
          </div>
          
          <img src={renderedAvatar} alt="avatar" className={styles['profile__pic']} />

          <div className={styles['profile__details']}>
            <span>Name</span><span>{profile.name}</span>
            <span>Age</span><span>{profile.age}</span>
            <span>pays</span> <span>{profile.price}€</span>
            <span>would live in</span><span>{profile.district}</span>
            <span>helps with</span>
            <span>
              {profile.length !== 0 && profile.help.map(
                help => <span key = {help}>{help}</span>)
              }
            </span>
          </div>
          {profile.length !== 0 && user !==null && user.profile === this.props.match.params.id &&
            <div className={styles['profile__details__ctrl']}>
              <Link to={`/edit/${profile._id}`}>
                <button className={styles['ctrl__btn']}>Edit Profile</button>
              </Link>
              <button 
                className={`${styles['ctrl__btn']} ${styles['btn-del']}`}
                onClick={this.deleteProfile}
              >Delete Profile</button>
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
