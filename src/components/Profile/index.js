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
    render() {
    const profile = this.state.profile;
    const user = this.props.fetchedUser;

    let renderedAvatar = dummyAvatar;
    const { avatarUrl } = this.state.profile;
    if (avatarUrl) renderedAvatar = avatarUrl;
    
    return (
      <div className={`full-block ${styles.profile}`}>
        <div className={styles['profile__msg']}>
          If you are interested in this request, please contact info@grossjungig.de or +49 30 55231271
        </div>
 
        <img src={renderedAvatar} alt='avatar' />
        <div> {profile.name} </div>
        <div> {profile.age} </div>
        <div> €{profile.price} </div>
        <div> {profile.district} </div>
        {profile.length !== 0 && 
          profile.help.map(help =>
            <div key = {help}> - {help} </div>
          )
        }

        <div>
          {profile.length !== 0 && user !==null && user.profile === this.props.match.params.id &&
            <>
              <Link to={`/edit/${profile._id}`}>
                <button>
                  Edit Profile
                </button>
              </Link>
              <button>Delete Profile</button>
            </>
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
