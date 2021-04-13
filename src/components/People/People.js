import React, { Component } from "react";
import axios from '../../axios';
import dummyAvatar from '../../assets/images/dummy-avatar.jpg';
import { capitalizeFirstLetter } from '../../utils';
import './index.css'
import Spinner from '../Spinner';
import { connect } from 'react-redux';

class People extends Component {
  state = {
    people: [],
    loading: true,
  };

  async componentDidMount() {
    const response = await axios.get('api/profiles');

    this.setState({
      people: response.data.profiles,
      loading: false
    });
  }

  handleClick(_id) {
    this.props.history.push(`/profile/${_id}`);
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="loading">
          <Spinner />
        </div>
      )
    }

    return (
      <ul className="profile-card-container">
        {this.state.people.map((profile) => {
          return (
            <li
              className="profile-card"
              onClick={() => this.handleClick(profile._id)}
              key={profile._id}
            >
              <div className="profile-card__avatar">
                <img src={profile.avatarUrl || dummyAvatar} alt="person" />
              </div>
              <div >
                <h3>{capitalizeFirstLetter(profile.name)}, {profile.age}</h3>
                <div>
                  <span className="profile-card__item">would live in:</span>
                  {profile.district}
                </div>
                <p>
                <span className="profile-card__item">can pay around:</span>
                  {profile.price}€ (monthly)
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return {
    loggedIn: !!reduxState.token,
  };
};

export default connect(mapStateToProps)(People);
