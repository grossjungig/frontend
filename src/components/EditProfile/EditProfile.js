import React, { Component } from "react";
import axios from '../../axios';
import newAxios from 'axios';
import { connect } from 'react-redux';
import dummyAvatar from '../../assets/images/dummy-avatar.jpg';
import { generateBase64FromImage } from '../../utils';
import offeredhelps from '../../assets/checkbox/help';
import Checkbox from '../Checkbox/Checkbox'

import apStyles from '../../pages/profile/addProfile/index.module.css'; // ap = Add Profile
import { fullBlock } from '../../shared/index.module.css';
import { delBtn, formAction } from './index.module.css';

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
    checkedItems: new Map(),
    images: [],
    redirect: false,

    avatarUrl: '',
    avatarPreview: dummyAvatar,
    avatarFile: {},
    avatarPreviewErr: '',
    signedRequest: ''
  };

  componentDidMount() {
    axios.get(`api/profiles/${this.props.fetchedUser.profile}`)
      .then(({data}) => {
        var offeredHelp = new Map(JSON.parse(data.offeredHelp));
        this.setState({
          name: data.user.name,
          email: data.user.email,
          age: data.age,
          gender: data.gender,
          district: data.district,
          description: data.description,
          price: data.price,
          phoneNumber: data.phoneNumber,
          owner: data.owner,
          checkedItems: new Map([...this.state.checkedItems, ...offeredHelp]),
          images: [],
          avatarPreview: data.avatarUrl,
          avatarUrl: data.avatarUrl,
          
        });
      })
      .catch((error) => {
        console.log(error);
      });

  }

  setHelp = (event) => {
    const help = event.target.name;
    const isChecked = event.target.checked;
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(help, isChecked) }));

  }

  setFormState = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleAvatarChange = async (event) => {
    const avatarFile = event.target.files[0];
    const formData = new FormData();
    formData.append('avatar', avatarFile);

    try {
      const s3Res = await axios.post('api/s3upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const base64img = await generateBase64FromImage(avatarFile);
      this.setState({ avatarPreview: base64img });

      const { signedRequest, imageUrl } = s3Res.data
      this.setState({ signedRequest: signedRequest });
      this.setState({ avatarUrl: imageUrl });
      this.setState({ avatarFile: avatarFile });
      
    } catch (err) {
      console.log(err);
      this.setState({ avatarPreviewErr: err.message });
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
    var checkedItems = this.state.checkedItems;
    var filterCheckedItems = checkedItems.forEach((value,key) =>{ if(value === false) checkedItems.delete(key)})
    var stringifyOfferedHelp = JSON.stringify(Array.from(checkedItems.entries()));
    
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
      avatarUrl: this.state.avatarUrl,
      offeredHelp: stringifyOfferedHelp
    };

    // Direct Upload to AWS S3
    const { signedRequest, avatarFile } = this.state;
    newAxios.put(signedRequest, avatarFile )
      .catch(err => { this.setState({ avatarPreviewErr: err.message }) });
   
    axios
      .post(
        `api/edit/${this.props.fetchedUser.profile}`,
        obj
      )
      .then((res) => this.props.history.push(`/profile/${this.props.fetchedUser.profile}`)
      );
      
  };

  cancelEdit = () => {
    this.props.history.push('/userportal');
  }

  render() {
    return (
      <div className={fullBlock}>
        <div className={apStyles.main}>
          <div className={apStyles.msg}>
            Please do not leave your personal identifying information here.
          </div>
          
          <div className={apStyles.form}>
            <div className={apStyles.formCtrl}>
              <label>First Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={this.state.name}
                onChange={this.setFormState}
                className={apStyles.input}
              />
            </div>

            <div className={apStyles.formCtrl}>
              <label className="label_profile" htmlFor="gender">Gender</label>
              <select
                name="gender"
                type="select"
                value={this.state.gender}
                onChange={this.setFormState}
                className={apStyles.input}
              >
                <option value="" disabled >Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="divers">Divers</option>
              </select>
            </div>

            <div className={apStyles.formCtrl}>
              <label>Age</label>
              <input
                type="text"
                name="age"
                id="age"
                value={this.state.age}
                onChange={this.setFormState}
                className={apStyles.input}
              />
            </div>

            <label>Requested room price</label>
            <input
              type="number"
              name="price"
              id="price"
              value={this.state.price}
              onChange={this.setFormState}
              className={apStyles.input}
            />

            <label>About me (max 120 signs)</label>
            <textarea
              type="text"
              name="description"
              id="description"
              value={this.state.description}
              onChange={this.setFormState}
              maxLength="120"
              rows="3"
              className={apStyles.input}
            />

            <label>Offered Help</label>
            <div>
            {offeredhelps.map(help => (
                <Checkbox key={help.key} item={help} checked={this.state.checkedItems.get(help.name)}  setHelp={this.setHelp} />
              ))}
            </div>

            <label>Prefered district</label>
            <select
              name="district"
              type="select"
              value={this.state.district}
              onChange={this.setFormState}
              placeholder="Select"
              className={apStyles.input}
            >
              <option value="" disabled >Select</option>
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
            <img
              className={apStyles.avatarImg}
              alt="avatar"
              src={this.state.avatarPreview}
            />
            <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={this.handleAvatarChange}
                className={apStyles.input}
            />
            <span>{this.state.avatarPreviewErr}</span>

            <div className={apStyles.msg}>
              By creating a request, you agree to our Terms and Conditions and Data Privacy Policy.
            </div>
          
            <div className={formAction}>
              <button className={`${apStyles.btn} ${delBtn}`} onClick={this.cancelEdit}>Cancel</button>
              <button className={apStyles.btn} onClick={this.onSubmit}>Submit</button>
            </div>
            {this.state.message && <p>{this.state.message}</p>}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (reduxState) => ({
  fetchedUser: reduxState.user
});

export default connect(mapStateToProps)(EditProfile);
