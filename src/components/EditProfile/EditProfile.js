import React, { Component } from "react";
import axios from '../../axios';
import newAxios from 'axios';
import { connect } from 'react-redux';
import { dispatchCheckAuth } from "../../store/auth/thunks";
import dummyAvatar from '../../assets/images/dummy-avatar.jpg';
import { generateBase64FromImage } from '../../utils';
import offeredhelps from '../../assets/checkbox/help';
import Checkbox from '../Checkbox/Checkbox'
import editProfileLocales from '../../locales/locales.Profile.json'

import apStyles from '../../pages/profile/addProfile/index.module.css'; // ap = Add Profile
import { fullBlock } from '../../shared/index.module.css';
import { delBtn, formAction } from './index.module.css';

class EditProfile extends Component {
  state = {
    profile: [],
    name: "",
    age: "",
    gender: "select",
    district: "select",
    description: "",
    price: "",
    offeredHelp:[],

    avatarUrl: '',
    avatarPreview: dummyAvatar,
    avatarFile: {},
    avatarPreviewErr: '',
    signedRequest: ''
  };

  componentDidMount() {
    const profileId = this.props.match.params.id;
    axios.get(`api/profiles/${profileId}`)
      .then(({data}) => {
        this.setState({
          name: data.user.name,
          email: data.user.email,
          age: data.age,
          gender: data.gender,
          district: data.district,
          description: data.description,
          price: data.price,
          phoneNumber: data.phoneNumber,
          offeredHelp: data.help.slice(),
          avatarPreview: data.avatarUrl,
          avatarUrl: data.avatarUrl,
        });
      })
      .catch((error) => {
        console.log(error);
      });

  }

  handleHelp = ({ target }) => {
    const help = target.name;
    const isChecked = target.checked;
    if (isChecked) {
      this.setState({ offeredHelp: [...this.state.offeredHelp, help] })
      } else {
      this.setState(
        { offeredHelp: this.state.offeredHelp.filter((item) => item !== help) })}
  };

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
      this.setState({ avatarPreviewErr: err.message });
    }
  }

  onSubmit = (event) => {
    event.preventDefault();

    // Direct Upload to AWS S3
    const { signedRequest, avatarFile } = this.state;
    newAxios.put(signedRequest, avatarFile )
      .catch(err => { this.setState({ avatarPreviewErr: err.message }) });
   
    const obj = {
      name: this.state.name,
      age: this.state.age,
      email: this.state.email,
      gender: this.state.gender,
      district: this.state.district,
      description: this.state.description,
      price: this.state.price,
      phoneNumber: this.state.phoneNumber,
      avatarUrl: this.state.avatarUrl,
      help: this.state.offeredHelp
    };

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
    const { name, age, gender, price, description, district, offeredHelp, avatarPreview, avatarPreviewErr, message } = this.state;
    const lang = localStorage.getItem("lang");

    return (
      <div className={fullBlock}>
        <div className={apStyles.main}>
          <div className={apStyles.msg}>
            {editProfileLocales.info[lang]}
          </div>

          <div className={apStyles.form}>
            <div className={apStyles.formCtrl}>
              <label>{editProfileLocales.name[lang]}</label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={this.setFormState}
                className={apStyles.input}
              />
            </div>

            <div className={apStyles.formCtrl}>
              <label className="label_profile" htmlFor="gender">{editProfileLocales.gender[lang]}</label>
              <select
                name="gender"
                type="select"
                value={gender}
                onChange={this.setFormState}
                className={apStyles.input}
              >
                <option value="" disabled >{editProfileLocales.select[lang]}</option>
                <option value="male">{editProfileLocales.male[lang]}</option>
                <option value="female">{editProfileLocales.female[lang]}</option>
                <option value="divers">{editProfileLocales.divers[lang]}</option>
              </select>
            </div>

            <div className={apStyles.formCtrl}>
              <label>{editProfileLocales.age[lang]}</label>
              <input
                type="text"
                name="age"
                id="age"
                value={age}
                onChange={this.setFormState}
                className={apStyles.input}
              />
            </div>
            <div className={apStyles.formCtrl}>
              <label>{editProfileLocales.requestedPrice[lang]}</label>
              <input
                type="number"
                name="price"
                id="price"
                value={this.state.price}
                onChange={this.setFormState}
                className={apStyles.input}
              />
            </div>
            <div className={apStyles.formCtrl}>
              <label>{editProfileLocales.about[lang]}</label>
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
            </div>  
            <div className={apStyles.formCtrl} style={{height: "max-content"}} >
              <label>{editProfileLocales.getHelp[lang]}</label>
            </div>
            <div className={apStyles.formCtrl}>
              <label>{editProfileLocales.district[lang]}</label>
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
            </div>

            <label>Requested room price</label>
            <input
              type="number"
              name="price"
              id="price"
              value={price}
              onChange={this.setFormState}
              className={apStyles.input}
            />

            <label>About me (max 120 signs)</label>
            <textarea
              type="text"
              name="description"
              id="description"
              value={description}
              onChange={this.setFormState}
              maxLength="120"
              rows="3"
              className={apStyles.input}
            />

            <label>Offered Help</label>
            <div>
            {offeredhelps.map(help => (
                <Checkbox key={help.key} item={help} checked={offeredHelp.includes(help.name)}  handleHelp={this.handleHelp} />
              ))}
            </div>

            <label>Prefered district</label>
            <select
              name="district"
              type="select"
              value={district}
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
              src={avatarPreview}
            />
            <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={this.handleAvatarChange}
                className={apStyles.input}
            />
            <span>{avatarPreviewErr}</span>

            <div className={apStyles.msg}>
              {editProfileLocales.policy[lang]}
            </div>

            <div className={formAction}>
              <button className={`${apStyles.btn} ${delBtn}`} onClick={this.cancelEdit}>Cancel</button>
              <button className={apStyles.btn} onClick={this.onSubmit}>Submit</button>
            </div>
            {message && <p>{message}</p>}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
