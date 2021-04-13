import React, { Component } from "react";
import { Redirect,Link } from "react-router-dom";
import axios from "axios";
import { connect } from 'react-redux';
import Select from 'react-select'
import addProfileLocales from '../../locales/locales.addprofile.json'
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

class AddProfile extends Component {
  state = {
    name: "",
    age: "",
    gender: "",
    district: "",
    description: "",
    price: "",
    postcode: "",
    address: "",
    phoneNumber: "",
    owner: "",
    help: [],
    images: [],
    redirect: false,
    user: '',
  };

  componentDidMount(){
    const { fetchedUser } = this.props;
    if (fetchedUser) {
      this.setState({ user: fetchedUser });
    }
  }
  
  setFormState = (event) => {

    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  setHelp = (event) => {
    this.setState({ help: event })
  }
  addNewProfile = (event) => {
    event.preventDefault();
    const arr=this.state.help;
    var helps=[];
    for (var i = 0 ;i < arr.length; i++ )
    {
      helps.push(arr[i].value);
    }
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
        help: helps,
      })
      .then((response) => {
        this.props.history.push("/userportal", { user: this.props.user });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/profiles" />;
    }
    const lang = localStorage.getItem("lang");
    return (

      <div style={{ height: "auto", width: "auto" }}>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "3vh" }}>
          <div className="warning" style={{ margin: "1vh" }}>
            <p >{addProfileLocales.info[lang]}</p>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "328px" }}>

            <label className="label_profile" htmlFor="name" style={{marginBottom:"2vh"}}>{addProfileLocales.name[lang]}</label>
            <input
              type="text"
              name="name"
              id="name"
              value={this.state.name}
              onChange={this.setFormState}
              className="input_profile"
            />

            <label className="label_profile" htmlFor="gender">{addProfileLocales.gender[lang]}</label>
            <select
              name="gender"
              type="select"
              value={this.state.gender}
              onChange={this.setFormState}
              style={{ marginTop: "2vh" }}
              className="select_profile"
            >
              <option style={{ backgroundColor: "#F9F8F8", fontFamily: "Montserrat" }} value="" disabled>{addProfileLocales.select[lang]}</option>
              <option style={{ backgroundColor: "#F9F8F8", fontFamily: "Montserrat" }} value="male">{addProfileLocales.male[lang]}</option>
              <option style={{ backgroundColor: "#F9F8F8", fontFamily: "Montserrat" }} value="female">{addProfileLocales.female[lang]}</option>
              <option style={{ backgroundColor: "#F9F8F8", fontFamily: "Montserrat" }} value="divers">{addProfileLocales.divers[lang]}</option>
            </select>

            <label htmlFor="age" className="label_profile" style={{marginBottom:"2vh"}} >{addProfileLocales.age[lang]}</label>
            <input
              type="text"
              name="age"
              id="age"
              value={this.state.age}
              onChange={this.setFormState}
              className="input_profile"
            />

            <label className="label_profile" htmlFor="price" style={{marginBottom:"2vh"}}>{addProfileLocales.requestedPrice[lang]}</label>
            <input
              type="number"
              name="price"
              id="price"
              value={this.state.price}
              onChange={this.setFormState}
              className="input_profile"
            />
            <label htmlFor="district" className="label_profile" >{addProfileLocales.about[lang]}</label>
            <textarea
              type="text"
              name="description"
              id="description"
              value={this.state.description}
              onChange={this.setFormState}
              maxLength="120"
              rows="3"
              style={{ marginTop: "2vh" }}
              className="textarea_profile"
            />

            <label className="label_profile" htmlFor="help" style={{marginBottom:"2vh"}}>{addProfileLocales.expectedHelp[lang]}</label>
            <Select isMulti options={addProfileLocales.options[lang]} onChange={this.setHelp} id="help"
              name="help" />

            <label className="label_profile" htmlFor="select">{addProfileLocales.district[lang]}</label>
            <select
              name="district"
              type="select"
              value={this.state.district}
              onChange={this.setFormState}
              className="select_profile"
              placeholder="Select"
            >
              <option value="" disabled>{addProfileLocales.select[lang]}</option>
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


            
            <label className="label_profile" >{addProfileLocales.picture[lang]}</label>
            <button type="submit" className="button_profile">
             
              {addProfileLocales.uploadPicture[lang]}
        </button>

            <div className="warning" style={{ marginTop: "2vh" }}>
              <p>{addProfileLocales.policy[lang]}</p>
          
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Link to={`/userportal`}>
              <button type="submit" className="button_profile" style={{ width: "150px" }}>{addProfileLocales.cancel[lang]}</button>
              </Link>
              <button type="submit" className="button_profile" style={{ width: "150px", background: "#365FA7", color: "#F9F8F8" }} onClick={this.addNewProfile} >{addProfileLocales.submit[lang]}</button>
            </div>
            {this.state.message && <p>{this.state.message}</p>}

          </div >
          <div>

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  fetchedUser: reduxState.user
});

export default connect(mapStateToProps)(AddProfile);
