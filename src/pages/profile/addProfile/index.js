import React, { Component } from "react";
import { Redirect,Link } from "react-router-dom";
import './index.css';
import axios from '../../../axios';
import newAxios from 'axios';
import { connect } from 'react-redux';
import Select from 'react-select'
import { dispatchCheckAuth } from "../../../store/auth/thunks";
import dummyAvatar from '../../../assets/images/dummy-avatar.jpg'

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

    avatarPreview: dummyAvatar,
    avatarPreviewErr: ''
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

  handleAvatarChange = async (event) => {
    const avatar = event.target.files[0];
    console.log(avatar);
    const formData = new FormData();
    formData.append('avatar', avatar);

    try {
      const s3Res = await axios.post('api/s3upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const { signedRequest, imageUrl } = s3Res.data
      await newAxios.put(signedRequest, avatar);
      this.setState({ avatarPreview: imageUrl });
    } catch (err) {
      console.log(err);
      this.setState({ avatarPreviewErr: err.message });
    }
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
      .post('api/addProfile', {
        name: this.state.name,
        district: this.state.district,
        postcode: this.state.postcode,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        description: this.state.description,
        price: this.state.price,
        gender: this.state.gender,
        age: this.state.age,
        help: helps,
        avatarUrl: this.state.avatarPreview
      })
      .then((res) => {
        this.props.refreshUser();
        this.props.history.push(`/profile/${res.data._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/profiles" />;
    }

    return (

      <div style={{ height: "auto", width: "auto" }}>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "3vh" }}>
          <div className="warning" style={{ margin: "1vh" }}>
            <p >Please do not leave your personal identifying information here.</p>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "328px" }}>

            <label className="label_profile" htmlFor="name" style={{marginBottom:"2vh"}}>First Name</label>
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
              <option  value="" disabled>Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="divers">Divers</option>
            </select>

            <label htmlFor="age" className="label_profile" style={{marginBottom:"2vh"}} >Age</label>
            <input
              type="text"
              name="age"
              id="age"
              value={this.state.age}
              onChange={this.setFormState}
              className="input_profile"
            />

            <label className="label_profile" htmlFor="price" style={{marginBottom:"2vh"}}>Requested room price</label>
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
              maxLength="120"
              rows="3"
              style={{ marginTop: "2vh" }}
              className="textarea_profile"
            />

            <label className="label_profile" htmlFor="help" style={{marginBottom:"2vh"}}>Offered Help</label>
            <Select isMulti options={options} onChange={this.setHelp} id="help"
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
              <option value="" disabled>Select</option>
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

            <label className="label_profile" >Profile picture</label>
            <img src={this.state.avatarPreview} className="avatar-preview" alt="avatar"/>
            <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={this.handleAvatarChange}
            />
            <span className="avatar-preview-err">{this.state.avatarPreviewErr}</span>

            <div className="warning" style={{ marginTop: "2vh" }}>
              <p>By creating a request, you agree to our Terms and Conditions and Data Privacy Policy.</p>
          
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Link to={`/userportal`}>
              <button type="submit" className="button_profile" style={{ width: "150px" }}>Cancel</button>
              </Link>
              <button type="submit" className="button_profile" style={{ width: "150px", background: "#365FA7", color: "#F9F8F8" }} onClick={this.addNewProfile} >Submit</button>
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

const mapDispatchToProps = {
  refreshUser: () => dispatchCheckAuth()
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProfile);
