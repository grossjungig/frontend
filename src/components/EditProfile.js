import React, { Component } from "react";
import axios from "axios";
import Select from 'react-select'

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
    help: [],
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
       
        const helps = data.data.help;
        var helpsArr = [];
        for (var i = 0; i < helps.length; i++) {
            var help = { label: helps[i], value: helps[i] }
            helpsArr.push(help);
        }     
        this.setState({ help: helpsArr })
      })
      .catch((error) => {
        console.log(error);
      });
      
      
  }
  setHelp = (event) => {
    console.log("event", event)
    this.setState({ help: event })
  }

  setFormState = (event) => {

    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  editProfile = (event) => {
    event.preventDefault();
    const arr=this.state.help;
    var helps=[];
    for (var i = 0 ;i < arr.length; i++ )
    {
      helps.push(arr[i].value);
    }

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
      help: helps,
    };
    console.log("obj", obj)
    axios
      .post(
        `${process.env.REACT_APP_BACKENDURL}api/edit/${this.state.user.profile}`,
        obj
      )
      .then((res) => this.props.history.push("/profile")
      );
      
  };

  setFormState = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    return (
      <div style={{ height: "auto", width: "auto" }}>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "3vh" }}>
          <div className="warning" style={{ margin: "1vh" }}>
            <p >Please do not leave your personal identifying information here.</p>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "328px" }}>
            <label className="label_profile" htmlFor="name" style={{ marginBottom: "2vh" }}>First Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={this.state.name}
              onChange={this.setFormState}
              className="input_profile"
            />

            <label className="label_profile" htmlFor="gender">Gender</label>
            <select
              name="gender"
              type="select"
              value={this.state.gender}
              onChange={this.setFormState}
              style={{ marginTop: "2vh" }}
              className="select_profile"
            >
              <option style={{ backgroundColor: "#F9F8F8", fontFamily: "Montserrat" }} value="" disabled selected>Select</option>
              <option style={{ backgroundColor: "#F9F8F8", fontFamily: "Montserrat" }} value="male">Male</option>
              <option style={{ backgroundColor: "#F9F8F8", fontFamily: "Montserrat" }} value="female">Female</option>
              <option style={{ backgroundColor: "#F9F8F8", fontFamily: "Montserrat" }} value="divers">Divers</option>
            </select>

            <label htmlFor="age" className="label_profile" style={{ marginBottom: "2vh" }}>Age</label>
            <input
              type="text"
              name="age"
              id="age"
              value={this.state.age}
              onChange={this.setFormState}
              className="input_profile"
            />

            <label className="label_profile" htmlFor="price" style={{ marginBottom: "2vh" }} >Requested room price</label>
            <input
              type="number"
              name="price"
              id="price"
              value={this.state.price}
              onChange={this.setFormState}
              className="input_profile"
            />

            <label htmlFor="district" className="label_profile" >About me (max 120 signs)</label>
            <textarea
              type="text"
              name="description"
              id="description"
              value={this.state.description}
              onChange={this.setFormState}
              maxlength="120"
              rows="3"
              style={{ marginTop: "2vh" }}
              className="textarea_profile"
            />
            <label className="label_profile" htmlFor="help" style={{ marginBottom: "2vh" }}>{this.props.user.role == "senior" ? "Help I‘d like to get" : "Offered Help"}</label>
            <Select isMulti options={options} onChange={this.setHelp} id="help" value={this.state.help}
              name="help" />

            <label className="label_profile" htmlFor="select">Prefered district</label>
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

            <label className="label_profile" >Picture</label>
            <button type="submit" className="button_profile">
              Upload the picture
        </button>

            <div className="warning" style={{ marginTop: "2vh" }}>
              <p >By creating a request, you agree to our Terms and Conditions and Data Privacy Policy.</p>

            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button type="submit" className="button_profile" style={{ width: "150px" }}>Cancel</button>
              <button type="submit" className="button_profile" style={{ width: "150px", background: "#365FA7", color: "#F9F8F8" }} onClick={this.editProfile} >Submit</button>
            </div>
            {this.state.message && <p>{this.state.message}</p>}
          </div>
        </div>

      </div>
    );
  }
}
export default EditProfile;
