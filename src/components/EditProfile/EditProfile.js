import React, { Component } from "react";
import axios from '../../axios';
import newAxios from 'axios';
import Select from 'react-select'
import { connect } from 'react-redux';
import dummyAvatar from '../../assets/images/dummy-avatar.jpg';
import { generateBase64FromImage } from '../../utils';
import apStyles from '../../pages/profile/addProfile/index.module.css'; // ap = Add Profile
import { fullBlock } from '../../shared/index.module.css';
import { delBtn, formAction } from './index.module.css';

import editProfileLocales from "../../locales/locales.Profile.json";
import { withRouter } from "react-router-dom";

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

    avatarUrl: '',
    avatarPreview: dummyAvatar,
    avatarFile: {},
    avatarPreviewErr: '',
    signedRequest: ''
  };

  componentDidMount() {
    axios.get(`api/profiles/${this.props.fetchedUser.profile}`)
      .then(({ data }) => {
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
          help: data.help,
          images: [],
          avatarPreview: data.avatarUrl,
          avatarUrl: data.avatarUrl
        });

        const helps = data.help;
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
    this.setState({ help: event })
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

  editProfile = (event) => {
    event.preventDefault();
    const arr = this.state.help;
    const helps = [];
    for (var i = 0; i < arr.length; i++) {
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
      avatarUrl: this.state.avatarUrl,
      help: helps,
    };

    // Direct Upload to AWS S3
    const { signedRequest, avatarFile } = this.state;
    newAxios.put(signedRequest, avatarFile)
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
                value={this.state.name}
                onChange={this.setFormState}
                className={apStyles.input}
              />
            </div>

            <div className={apStyles.formCtrl}>
              <label className="label_profile" htmlFor="gender">{editProfileLocales.gender[lang]}</label>
              <select
                name="gender"
                type="select"
                value={this.state.gender}
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
                value={this.state.age}
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
              <Select
                isMulti
                options={editProfileLocales.options[lang]}
                onChange={this.setHelp}
                id="help"
                value={this.state.help}
                name="help"
                className={apStyles.input}
                style={{height: "max-content"}}
              />
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

            <div className={apStyles.formCtrl}>
              <label className="label_profile" >{editProfileLocales.picture[lang]}</label>
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
            </div>
            <span>{this.state.avatarPreviewErr}</span>

            <div className={apStyles.msg}>
              {editProfileLocales.policy[lang]}
            </div>

            <div className={formAction}>
              <button className={`${apStyles.btn} ${delBtn}`} onClick={this.cancelEdit}>{editProfileLocales.cancel[lang]}</button>
              <button className={apStyles.btn} onClick={this.editProfile}>{editProfileLocales.submit[lang]}</button>
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

export default withRouter(connect(mapStateToProps)(EditProfile));

