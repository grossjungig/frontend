import React, { Component } from "react";
import axios from "axios";

//In progress
class EditProfile extends Component {
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
    help: "",
    images: [],
    redirect: false,
    user: this.props.user,
  };

  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_BACKENDURL}api/profiles/${this.props.user.profile}`
      )
      .then((data) => {
        this.setState({
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

  editProfile = (event) => {
    event.preventDefault();
    const obj = {
      name: this.state.name,
      age: this.state.age,
      email: this.state.email,
      gender: this.state.gender,
      district: this.state.district,
      description: this.state.description,
      price: this.state.price,
      phoneNumber: this.state.phoneNumber,
      owner: this.state.owner,
      help: this.state.help,
    };
    axios
      .post(
        `${process.env.REACT_APP_BACKENDURL}api/edit/${this.state.user.profile}`,
        obj
      )
      .then((res) => this.props.history.push("/profile"));
  };

  setFormState = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    return (
      <div style={{ height: "60vh" }}>
        <label htmlFor="name">Name:</label>
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
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          value={this.state.phoneNumber}
          onChange={this.setFormState}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          id="email"
          value={this.state.email}
          onChange={this.setFormState}
        />
        <label htmlFor="district">Desired District:</label>
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

        <label htmlFor="price">Desired Price</label>
        <input
          type="number"
          name="price"
          id="price"
          value={this.state.price}
          onChange={this.setFormState}
        />
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          name="description"
          id="description"
          value={this.state.description}
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
        <button type="submit" onClick={this.editProfile}>
          Submit
        </button>
        {this.state.message && <p>{this.state.message}</p>}
      </div>
    );
  }
}
export default EditProfile;
