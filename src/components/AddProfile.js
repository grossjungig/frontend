import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
//import profilesLocales from "../locales/locales.profiles.json";
//import addroomLocales from "../locales/locales.addrooms.json";

class AddProfile extends Component {
  state = {
    name: "",
    age: "",
    gender: "select",
    district: "select",
    description: "",
    price: "",
    postcode: "",
    address: "",
    phoneNumber: "",
    owner: "",
    help: "",
    images: [],
    redirect: false,
    user: this.props.user._id,
  };

  setFormState = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  addNewProfile = (event) => {
    event.preventDefault();
    //1. post the data to backend -> routes rooms.js
    axios
      .post(`${process.env.REACT_APP_BACKENDURL}api/addProfile`, {
        name: this.state.name,
        district: this.state.district,
        postcode: this.state.postcode,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        description: this.state.description,
        price: this.state.price,
        user: this.props.user._id,
        gender: this.state.gender,
        age: this.state.age,
        help: this.state.help,
      })
      .then((response) => {
        this.props.history.push("/userportal", { id: response.data._id });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    console.log(this.props.user);
    if (this.state.redirect) {
      return <Redirect to="/profiles" />;
    }

    return (
      <div style={{ height: "60vh" }}>
        <label htmlFor="name">name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={this.state.name}
          onChange={this.setFormState}
        />

        <label htmlFor="gender">Gender:</label>
        <select
          name="gender"
          type="select"
          value={this.state.gender}
          onChange={this.setFormState}
        >
          <option value="--">select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <label htmlFor="age">Age:</label>
        <input
          type="text"
          name="age"
          id="age"
          value={this.state.age}
          onChange={this.setFormState}
        />
        <label htmlFor="district">district:</label>
        <select
          name="district"
          type="select"
          value={this.state.district}
          onChange={this.setFormState}
        >
          <option value="--">select</option>
          <option value="Charlottenburg-Wilmersdorf">
            Charlottenburg-Wilmersdorf
          </option>
          <option value="Friedrichshain-Kreuzberg">
            Friedrichshain-Kreuzberg
          </option>
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
        <label htmlFor="address">address:</label>
        <input
          type="text"
          name="address"
          id="address"
          value={this.state.address}
          onChange={this.setFormState}
        />
        <label htmlFor="postcode">postcode</label>
        <input
          type="text"
          name="postcode"
          id="postcode"
          value={this.state.postcode}
          onChange={this.setFormState}
        />
        <label htmlFor="phoneNumber">phone number:</label>
        <input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          value={this.state.phoneNumber}
          onChange={this.setFormState}
        />
        <label htmlFor="email">email:</label>
        <input
          type="text"
          name="email"
          id="email"
          value={this.state.email}
          onChange={this.setFormState}
        />
        <label htmlFor="description">description:</label>
        <input
          type="text"
          name="description"
          id="description"
          value={this.state.description}
          onChange={this.setFormState}
        />

        <label htmlFor="price">price in euros:</label>
        <input
          type="number"
          name="price"
          id="price"
          value={this.state.price}
          onChange={this.setFormState}
        />
        <label htmlFor="help">Offered Help:</label>
        <input
          type="text"
          name="help"
          id="help"
          value={this.state.help}
          onChange={this.setFormState}
        />
        <button type="submit" onClick={this.addNewProfile}>
          Submit
        </button>
        {this.state.message && <p>{this.state.message}</p>}
      </div>
    );
  }
}

export default AddProfile;
