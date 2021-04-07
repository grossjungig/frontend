import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from '../../axios';
import './addRoom.css'
import {Link } from "react-router-dom";
import { connect } from 'react-redux';


class AddRoom extends Component {
  state = {
    name: "",
    description: "",
    price: "",
    district: "select",
    postcode: "",
    address: "",
    phoneNumber: "",
    email: "",
    neighbourhood: "",
    gender: "",
    age: "",
    help: [],
    owner: "",
    redirect: false,
  };

  setFormState = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  setHelp = (event) => {
    this.setState({ help: event })
  }

  addNewRoom = (event) => {
    event.preventDefault();
    axios
      .post('api/addRoom' , {
        name: this.state.name,
        district: this.state.district,
        postcode: this.state.postcode,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        email: this.state.email,
        description: this.state.description,
        price: this.state.price,
        owner: this.props.fetchedUser._id,
      })
      .then((response) => {
        this.props.history.push(`/berlin/${response.data._id}`);
        console.log("this is response", response);
      })
      .catch((err) => {
        this.setState({
          message: err.response.data.message,
        });
      });
  };

  render() {
    // const lang = localStorage.getItem("lang");
    if (this.state.redirect) {
      return <Redirect to="/berlin" />;
    }
   

    return (
      <div className="div_warning_1_addRoom" >
        <div className="div_warning_2_addRoom" >
          <div className="warning_addRoom" >
            <p >“Please do not leave your personal identifying information here”</p>
          </div>
        </div>
        <div className="main_div_addRoom" >
          <div className="main_div_2_addRoom">

            <label className="label_room" htmlFor="name">First Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={this.state.name}
              onChange={this.setFormState}
              className="input_room"
            />
             <label className="label_profile" htmlFor="gender">Gender</label>
            <select
              name="gender"
              type="select"
              value={this.state.gender}
              onChange={this.setFormState}
              className="select_room"
            >
              <option className="option_room" value="" disabled selected>Select</option>
              <option className="option_room" value="male">Male</option>
              <option className="option_room" value="female">Female</option>
              <option className="option_room" value="divers">Divers</option>
            </select> 

            <label className="label_room" htmlFor="age">Age</label>
            <input
              type="number"
              name="age"
              id="age"
              value={this.state.age}
              onChange={this.setFormState}
              className="input_room"
            /> 

            <label htmlFor="description" className="label_room" >About me (max 120 signs)</label>
            <textarea
              type="text"
              name="description"
              id="description"
              value={this.state.description}
              onChange={this.setFormState}
              maxlength="120"
              rows="3"
              className="textarea_room"
            />

            <label className="label_room" htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              value={this.state.price}
              onChange={this.setFormState}
              className="input_room"
            />

            <label className="label_profile" htmlFor="district">Prefered District</label>
            <select
              name="district"
              type="select"
              value={this.state.district}
              onChange={this.setFormState}
              className="select_profile"
              placeholder="Select"
            >
              <option value="" disabled selected>Select</option>
              <option value="Charlottenburg-Wilmersdorf">Charlottenburg-Wilmersdorf</option>
              <option value="Friedrichshain-Kreuzberg">Friedrichshain-Kreuzberg</option>
              <option value="Lichtenberg">Lichtenberg</option>
              <option value="Marzahn-Hellersdorf">Marzahn-Hellersdorf</option>
              <option value="Mitte">Mitte</option>
              <option value="Neukoelln">Neukoelln</option>
              <option value="Pankow">Pankow</option>
              <option value="Reinickendorf">Reinickendorf</option>
              <option value="Spandau">Spandau</option>
              <option value="Steglitz-Zehlendorf">Steglitz-Zehlendorf</option>
              <option value="Tempelhof-Schoeneberg">Tempelhof-Schoeneberg</option>
              <option value="Treptow-Koepenick">Treptow-Koepenick</option>
            </select>

            <label className="label_room" htmlFor="postcode">Postcode</label>
            <input
              type="number"
              name="postcode"
              id="postcode"
              value={this.state.postcode}
              onChange={this.setFormState}
              className="input_room"
            />

            <label className="label_room" htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={this.state.address}
              onChange={this.setFormState}
              className="input_room"
            />

            <label className="label_room" htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              value={this.state.phoneNumber}
              onChange={this.setFormState}
              className="input_room"
            />

            <label className="label_room" htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              value={this.state.email}
              onChange={this.setFormState}
              className="input_room"
            />

            <label className="label_room" htmlFor="neighbourhood">Neighbourhood</label>
            <input
              type="text"
              name="neighbourhood"
              id="neighbourhood"
              value={this.state.neighbourhood}
              onChange={this.setFormState}
              className="input_room"
            />

            <label className="label_room" >Picture</label>
            <button type="submit" className="button_room">Upload the picture</button>

            <div className="div_button_addRoom">
            <Link to={`/userportal`}>
              <button type="submit" className="button_room button_room_cancel" >Cancel</button>
            </Link>
              <button type="submit" className="button_room button_room_submit" onClick={this.addNewRoom} >Submit</button>
            </div>
         
          </div>
        </div>
      </div>
     
   
    );
  }
}

const mapStateToProps = (reduxState) => ({
  fetchedUser: reduxState.user
});

export default connect(mapStateToProps)(AddRoom);
