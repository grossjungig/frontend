import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import img from './home/header_image.png';

export default class Profile extends Component {
  state = {
    profile: [],
    name: "",
    age: "",
    email: "",
    gender: "select",
    district: "select",
    description: "",
    price: "",
    phoneNumber: "",
    owner: "",
    help: [],
    images: [],
    user: this.props.user,
  };
  componentDidMount() {
    
    axios
      .get(
        `${process.env.REACT_APP_BACKENDURL}api/profiles/${this.state.user.profile}`
      )
      .then((data) => {
        
        this.setState({
          profile: data.data,
          name: data.data.user.name,
          email: data.data.user.email,
          age: data.data.age,
          gender: data.data.gender,
          district: data.data.district,
          description: data.data.description,
          price: data.data.price,
          phoneNumber: data.data.phoneNumber,
          owner: data.data.owner,
          help: data.data.help,
          images: [],
        });
      })
      .catch((error) => {
        console.log(error);
      });

   
  }
  handleHelp = () => {

    return (<div>
      {this.state.help.map((help) => {
        return (
          <p className="tdcol">-{help}</p>
        )

      })}</div>)

  }
  render() {
    // let profile = this.state.profile;
    // if (this.state.profile.length !== 0) {
    return (
      <div style={{ height: "auto", width: "auto" }}>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "3vh" }}>
          <div className="warning" style={{ margin: "1vh" }}>
            <p >If you are interested in this request, please contact info@grossjungig.de or +49 30 55231271</p>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>

          <div style={{ width: "328px" }}>
            <label className="label_profile" htmlFor="name" style={{ marginBottom: "2vh" }}>Picture</label>
            <img src={img} style={{ width: "100%" }} alt="profile" />
            <table >
              <tr>
                <td className="tableProfile"><p className="label_profile" >Name:</p></td>
                <td className="tableProfile tdcol">{this.state.name}</td>
              </tr>
              <tr>
                <td className="tableProfile"><p className="label_profile" >Age:</p></td>
                <td className="tableProfile tdcol">{this.state.age}</td>
              </tr>
              <tr>
                <td className="tableProfile"><p className="label_profile" >Requested price:</p></td>
                <td className="tableProfile tdcol">{this.state.price}</td>
              </tr>
              <tr>
                <td className="tableProfile"><p className="label_profile" >Preferred district:</p></td>
                <td className="tableProfile tdcol">{this.state.district}</td>
              </tr>
              <tr>
                <td className="tableProfile"><p className="label_profile" >{this.props.user.role === "senior" ? "Help I‘d like to get" : "Offered Help"}:</p></td>
                <td className="tableProfile tdcol">{this.handleHelp()}</td>
              </tr>
            </table>

            <Link to={`/edit`}>
              <button className="button_profile" style={{width:"100%"}}>Edit Profile</button>
            </Link>


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
