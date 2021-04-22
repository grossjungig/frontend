import axios from '../../axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import dummyAvatar from '../../assets/images/dummy-avatar.jpg'
import { dispatchCheckAuth } from "../../store/auth/thunks";
import styles from './index.module.css';
import { fullBlock } from '../../shared/index.module.css'

class Profile extends Component {
  state = {
    profile: [],
    offeredHelp : [],
  };

  componentDidMount() {
    this.props.refreshUser();
    const profileId = this.props.match.params.id;
    axios.get(`api/profiles/${profileId}`)
      .then((response) => {
        var parseOfferedHelp= JSON.parse(response.data.offeredHelp);
        var offeredHelp = parseOfferedHelp.flat(1)
        this.setState({ 
          profile: response.data,
          offeredHelp: offeredHelp
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
    const offeredHelp = this.state.offeredHelp

    const user = this.props.fetchedUser;

    let renderedAvatar = dummyAvatar;
    const { avatarUrl } = this.state.profile;
    if (avatarUrl) renderedAvatar = avatarUrl;
    
    return (
      <div className={fullBlock}>
        <div className={styles.main}>
          <div className={styles.msg}>
            If you are interested in this request, please contact info@grossjungig.de or +49 30 55231271
          </div>
          
          <img src={renderedAvatar} alt="avatar" className={styles.pic} />

          <div className={styles.details}>
            <span>Name</span><span>{profile.name}</span>
            <span>Age</span><span>{profile.age}</span>
            <span>pays</span> <span>{profile.price}€</span>
            <span>would live in</span><span>{profile.district}</span>
            <span>helps with</span>
            <span>
              {profile.length !== 0 && offeredHelp.map(help =>
              typeof help === 'string'? <span key = {help}>{help}</span> : null
              
              )}
            </span>
          </div>
          {profile.length !== 0 && user !==null && user.profile === this.props.match.params.id &&
            <div className={styles.ctrl}>
              <Link to={`/edit/${profile._id}`}>
                <button className={styles.btn}>Edit Profile</button>
              </Link>
              <button 
                className={`${styles.btn} ${styles.delBtn}`}
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
const mapDispatchToProps = {
  refreshUser: () => dispatchCheckAuth()
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
