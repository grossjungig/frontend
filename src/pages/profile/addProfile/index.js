import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import styles from './index.module.css';
import { fullBlock } from '../../../shared/index.module.css';
import axios from '../../../axios';
import newAxios from 'axios';
import { connect } from 'react-redux';
import Select from 'react-select'
import { dispatchCheckAuth } from "../../../store/auth/thunks";
import dummyAvatar from '../../../assets/images/dummy-avatar.jpg'
import { generateBase64FromImage } from '../../../utils';

const options = [
  { value: 'Shopping', label: 'Shopping' },
  { value: 'Cooking or baking', label: 'Cooking or baking' },
  { value: 'digital devices', label: 'digital devices' },
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

    avatarUrl: '',
    avatarPreview: dummyAvatar,
    avatarFile: {},
    avatarPreviewErr: '',
    signedRequest: ''
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

  addNewProfile = (event) => {
    event.preventDefault();
    const arr=this.state.help;
    var helps=[];
    for (var i = 0 ;i < arr.length; i++ )
    {
      helps.push(arr[i].value);
    }

    // Direct Upload to AWS S3
    const { signedRequest, avatarFile } = this.state;
    newAxios.put(signedRequest, avatarFile )
      .catch(err => { this.setState({ avatarPreviewErr: err.message }) });
    
    axios.post('api/addProfile', {
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
      avatarUrl: this.state.avatarUrl
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
      <div className={fullBlock}>
        <div className={styles.main}>
          <div className={styles.msg}>
            Please do not leave your personal identifying information here.
          </div>

          <div className={styles.form}>
            <div className={styles.formCtrl}>
              <label htmlFor="name">First Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={this.state.name}
                onChange={this.setFormState}
                className={styles.input}
              />
            </div>

            <div className={styles.formCtrl}>
              <label htmlFor="gender">Gender</label>
              <select
                name="gender"
                type="select"
                value={this.state.gender}
                onChange={this.setFormState}
                className={styles.input}
              >
                <option  value="" disabled>Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="divers">Divers</option>
              </select>
            </div>

            <div className={styles.formCtrl}>
              <label htmlFor="age">Age</label>
              <input
                type="text"
                name="age"
                id="age"
                value={this.state.age}
                onChange={this.setFormState}
                className={styles.input}
              />
            </div>

            <div className={styles.formCtrl}>
              <label htmlFor="price">Requested room price</label>
              <input
                type="number"
                name="price"
                id="price"
                value={this.state.price}
                onChange={this.setFormState}
                className={styles.input}
              />
            </div>

            <div className={styles.formCtrl}>
              <label htmlFor="district" >About me (max 120 signs)</label>
              <textarea
                type="text"
                name="description"
                id="description"
                value={this.state.description}
                onChange={this.setFormState}
                maxLength="120"
                rows="3"
                className={styles.input}
              />
            </div>

            <div className={styles.formCtrl}>
              <label htmlFor="help">Offered Help</label>
              <Select
                isMulti
                options={options}
                onChange={this.setHelp}
                id="help"
                name="help"
                className={styles.input}
              />
            </div>

            <div className={styles.formCtrl}>
              <label htmlFor="select">Prefered district</label>
              <select
                name="district"
                type="select"
                value={this.state.district}
                onChange={this.setFormState}
                placeholder="Select"
                className={styles.input}
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
            </div>

            <div className={styles.formCtrl}>
              <label >Profile picture</label>
              <img src={this.state.avatarPreview} className={styles.avatarImg} alt="avatar"/>
              <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={this.handleAvatarChange}
                  className={styles.input}
              />
              <span className="avatar-preview-err">{this.state.avatarPreviewErr}</span>
            </div>

            <div className={styles.msg}>
              By creating a request, you agree to our Terms and Conditions and Data Privacy Policy.
            </div>

            <div>
              <button type="submit" className={styles.btn} onClick={this.addNewProfile} >Submit</button>
            </div>
          </div>
          {this.state.message && <p>{this.state.message}</p>}
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
