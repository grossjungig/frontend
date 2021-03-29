import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import roomsLocales from "../../locales/locales.rooms.json";
import Select from 'react-select'
import './addRoom.css'
import {Link } from "react-router-dom";
import { connect } from 'react-redux';

//import addroomLocales from "../locales/locales.addrooms.json";
const options = [
  { value: 'Shopping', label: 'Shopping' },
  { value: 'Cooking or baking', label: 'Cooking or baking' },
  { value: 'Help with digital devices', label: 'Help with digital devices' },
  { value: 'Moving the lawn', label: 'Moving the lawn' },
  { value: 'Gardening', label: 'Gardening' },
  { value: 'Reading out loud', label: 'Reading out loud' },
  { value: 'Car transportation', label: 'Car transportation' },
  { value: 'Cleaning or domestic help', label: 'Cleaning or domestic help' },
  { value: 'Accompanying on walks', label: 'Accompanying on walks' },
  { value: 'Taking care of pets', label: 'Taking care of pets' },
  { value: 'Pflage/ Taking care of Seniors', label: 'Pflage/ Taking care of Seniors' }
]

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
    //console.log("WORKING?");
    event.preventDefault();
    const { fetchedUser } = this.props;
console.log("fetchedUser addnroom ", fetchedUser)
    //1. post the data to backend -> routes rooms.js
    axios
      .post(`${process.env.REACT_APP_BACKENDURL}api/addRoom`, {
        name: this.state.name,
        district: this.state.district,
        postcode: this.state.postcode,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        email: this.state.email,
        description: this.state.description,
        price: this.state.price,
        owner: fetchedUser._id,
      })
      .then((response) => {
        this.props.history.push("/rooms");
        console.log("this is response", response);
      })
      .catch((err) => {
        this.setState({
          message: err.response.data.message,
        });
      });
  };

  render() {
    //console.log(this.state);
    console.log(this.props.user);
    const lang = localStorage.getItem("lang");
    if (this.state.redirect) {
      return <Redirect to="/berlin" />;
    }
    const { fetchedUser } = this.props;
    if (fetchedUser) {
      this.state.user = fetchedUser;
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

            {/* ******* * NAME * ******** */}
            <label className="label_room" htmlFor="name">First Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={this.state.name}
              onChange={this.setFormState}
              className="input_room"
            />

            {/* ******* * GENDER * ******** */}
            {/* <label className="label_profile" htmlFor="gender">Gender</label>
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
            </select> */}

            {/* ******* * AGE * ******** */}
            {/* <label className="label_room" htmlFor="age">Age</label>
            <input
              type="number"
              name="age"
              id="age"
              value={this.state.age}
              onChange={this.setFormState}
              className="input_room"
            /> */}

            {/* ******* * HELP* ******** */}
            {/* <label className="label_room" htmlFor="help" >Expected Helps</label>
            <Select isMulti options={options} onChange={this.setHelp} id="help" value={this.state.help}
              name="help" /> */}

            {/* ******* * ABOUT ME / DISCRIPTION* ******** */}
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

            {/* ******* * PRICE * ******** */}
            <label className="label_room" htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              value={this.state.price}
              onChange={this.setFormState}
              className="input_room"
            />

            {/* ******* * DISTRICT * ******** */}
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

            {/* ******* * POSTCODE * ******** */}
            <label className="label_room" htmlFor="postcode">Postcode</label>
            <input
              type="number"
              name="postcode"
              id="postcode"
              value={this.state.postcode}
              onChange={this.setFormState}
              className="input_room"
            />

            {/* ******* * ADDRESS * ******** */}
            <label className="label_room" htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={this.state.address}
              onChange={this.setFormState}
              className="input_room"
            />

            {/* ******* * PHONE NUMBER * ******** */}
            <label className="label_room" htmlFor="phoneNumber">Phone Number</label>
            <input
              type="number"
              name="phoneNumber"
              id="phoneNumber"
              value={this.state.phoneNumber}
              onChange={this.setFormState}
              className="input_room"
            />

            {/* ******* * EMAIL * ******** */}
            <label className="label_room" htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              value={this.state.email}
              onChange={this.setFormState}
              className="input_room"
            />

            {/* ******* * NEIOGHBOURHOOD * ******** */}
            <label className="label_room" htmlFor="neighbourhood">Neighbourhood</label>
            <input
              type="text"
              name="neighbourhood"
              id="neighbourhood"
              value={this.state.neighbourhood}
              onChange={this.setFormState}
              className="input_room"
            />
            {/* ******* * PICTURE * ******** */}
            <label className="label_room" >Picture</label>
            <button type="submit" className="button_room">Upload the picture</button>

            {/* ******* * BUTTON * ******** */}
            <div className="div_button_addRoom">
            <Link to={`/profile`}>
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
