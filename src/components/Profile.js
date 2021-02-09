import axios from "axios";
import React, { Component} from "react";
import { Link } from "react-router-dom";

export default class Profile extends Component {
  state = {
    profile: [],
    user: this.props.user,
  };
  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_BACKENDURL}api/profiles/${this.state.user.profile}`
      )
      .then((profile) => {
        console.log("user in the then", profile);
        this.setState({
          profile: profile.data,
        });
        console.log("after set state", this.state.profile);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    let profile = this.state.profile;
    console.log("history", this.props.history);
    if (this.state.profile.length !== 0) {
      return (
        <div>
          <p>Name: {profile.name}</p>
          <p>Age:{profile.age}</p>
          <p>Gender:{profile.gender}</p>
          <p>Requested Price:€{profile.price}</p>
          <p>Preferred District:{profile.district}</p>
          <p>About Me:{profile.description}</p>
          <p>Offered Help:{profile.help}</p>
          <Link to={`/edit/${this.state.profile._id}`}>
            <button>Edit Profile</button>
          </Link>
        </div>
      );
    } else {
      return "wait";
    }
  }
}
