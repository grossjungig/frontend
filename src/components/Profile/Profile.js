import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import img from "../../assets/images/header_image.png";

export default class Profile extends Component {
  state = {
    profile: [],
    help: [],
  };
  // componentDidMount() {
  //   const profileId = this.props.match.params.id;
  //   axios
  //     .get(`${process.env.REACT_APP_BACKENDURL}api/profiles/${profileId}`)
  //     .then((data) => {
  //       this.setState({
  //         profile: data.data,
  //       });
  //       console.log("profile", this.state.profile.help);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
  async componentDidMount() {
    const profileId = this.props.match.params.id;
    let data = await axios
      .get(`${process.env.REACT_APP_BACKENDURL}api/profiles/${profileId}`)
      .then((response) => {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({ profile: data.data, help: data.data.help });
  }

  handleHelp = () => {
    return (
      <div>
        {this.state.help.map((help) => {
          return (
            <p key={help} className="tdcol">
              -{help}
            </p>
          );
        })}
      </div>
    );
  };
  render() {
    let profile = this.state.profile;
    console.log(profile)
    return (
      <div style={{ height: "auto", width: "auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "3vh",
          }}
        >
          <div className="warning" style={{ margin: "1vh" }}>
            <p>
              If you are interested in this request, please contact
              info@grossjungig.de or +49 30 55231271
            </p>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "328px" }}>
            <label
              className="label_profile"
              htmlFor="name"
              style={{ marginBottom: "2vh" }}
            >
              Picture
            </label>
            <img src={img} style={{ width: "100%" }} alt="profile" />
            <table>
              <tr>
                <td className="tableProfile">
                  <p className="label_profile">Name:</p>
                </td>
                <td className="tableProfile tdcol">{profile.name}</td>
              </tr>
              <tr>
                <td className="tableProfile">
                  <p className="label_profile">Age:</p>
                </td>
                <td className="tableProfile tdcol">{profile.age}</td>
              </tr>
              <tr>
                <td className="tableProfile">
                  <p className="label_profile">Requested price:</p>
                </td>
                <td className="tableProfile tdcol">{profile.price}</td>
              </tr>
              <tr>
                <td className="tableProfile">
                  <p className="label_profile">Preferred district:</p>
                </td>
                <td className="tableProfile tdcol">{profile.district}</td>
              </tr>
              <tr>
                <td className="tableProfile">
                  <p className="label_profile">Offered Help:</p>
                </td>
                <td className="tableProfile tdcol">{this.handleHelp()}</td>
              </tr>
            </table>
            {this.props.user !== undefined &&
            this.props.user.profile === this.props.match.params.id ? (
              <Link to={`/edit`}>
                <button className="button_profile" style={{ width: "100%" }}>
                  Edit Profile
                </button>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
      // <div>

      //   <p>Name: {profile.name}</p>
      //   <p>Age:{profile.age}</p>
      //   <p>Gender:{profile.gender}</p>
      //   <p>Requested Price:€{profile.price}</p>
      //   <p>Preferred District:{profile.district}</p>
      //   <p>About Me:{profile.description}</p>
      //   <p>Offered Help:{profile.help}</p>
      //   <Link to={`/edit/${this.state.profile._id}`}>
      //     <button>Edit Profile</button>
      //   </Link>
      // </div>
    );
    // } else {
    //   return "wait";
    //}
  }
}
