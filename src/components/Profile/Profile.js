import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import "./profile.css";
import dummyAvatar from '../../assets/images/dummy-avatar.jpg'

class Profile extends Component {
  state = {
    profile: [],
    user: ''
  };

  componentDidMount() {
    const profileId = this.props.match.params.id;
    
    axios.get(`${process.env.REACT_APP_BACKENDURL}api/profiles/${profileId}`)
      .then((response) => {
        this.setState({ profile: response.data});
      })
      .catch(function (error) {
        console.log(error);
      });

      const { fetchedUser } = this.props;
      if (fetchedUser) {
        this.setState({ user: fetchedUser });
      }
  }
    render() {
    const profile = this.state.profile;

    let renderedAvatar = dummyAvatar;
    const { avatarUrl } = this.state.profile;
    if (avatarUrl) renderedAvatar = avatarUrl;
    
    return (
      <div className = 'profile-container' >
        <div className = 'message-container'>
          <div className = 'warning' style={{ margin: '1vh' }}>
            <p>
              If you are interested in this request, please contact
              info@grossjungig.de or +49 30 55231271
            </p>
          </div>
        </div>

        <div className = 'profile-picture-container'>
          <div style={{ width: '328px' }}>
          <div className = 'label-profile'> Picture </div>
            <img src={renderedAvatar} style={{ width: '100%' }} alt='avatar' />
          </div>
          </div>

        <div className = 'details-container'>
          <div className = 'label-container'>

          <div className = 'label-profile '> Name </div>
          <div className = 'label-profile'> Age </div>
          <div className = 'label-profile'> Requested Price </div>
          <div className = 'label-profile'> Preferred district </div>
          <div className = 'label-profile'> Offered Help </div>

          </div>
         
          <div className = 'info-container'>

          <div className = 'info-item'> {profile.name} </div>
          <div className = 'info-item'> {profile.age} </div>
          <div className = 'info-item'> €{profile.price} </div>
          <div className = 'info-item'> {profile.district} </div>

           {profile.length !== 0 ? profile.help.map(help => { return ( <div key = {help} className = 'info-item'> --{help} </div> );}) : null }
          
           </div>
        </div>

        <div>
        {profile.length !== 0 && this.state.user.profile === this.props.match.params.id ? (
              <Link to={`/edit/${profile._id}`}>
                <button className = 'button_profile' style={{ width: '100%' }}>
                  Edit Profile
                </button>
              </Link>
            ) : null} 
            </div>
    </div>    
    );
  }
}
const mapStateToProps = (reduxState) => ({
  fetchedUser: reduxState.user
});

export default connect(mapStateToProps)( Profile );
