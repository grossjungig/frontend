import React, { Component } from "react";
import axios from "axios";
import dummyAvatar from '../../assets/images/dummy-avatar.jpg'

export default class People extends Component {
  state = {
    people: [],
  };

  async componentDidMount() {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKENDURL}api/profiles`
    );

    // Set state
    this.setState({
      people: response.data.profiles,
    });
  }
  handleClick(_id) {
    this.props.history.push(`/profile/${_id}`);
  }
  render() {
    return (
      <div>
        {" "}
        {this.state.people.map((profile) => {
          return (
            <div
              style={{ display: "flex", justifyContent: "center" }}
              onClick={() => this.handleClick(profile._id)}
              key={profile._id}
            >
              <div className="card_people">
                <div className="card_img">
                  <img src={profile.avatarUrl || dummyAvatar} alt="person" style={{ width: "100%" }} />
                </div>
                <div className="container_people">
                  <h4>
                    <b>
                      {profile.name}, {profile.age}
                    </b>
                  </h4>
                  <p>{profile.district}</p>
                  <p>{profile.price}</p>
                </div>
              </div>
            </div>
          );
        })}{" "}
      </div>
    );
  }
}
