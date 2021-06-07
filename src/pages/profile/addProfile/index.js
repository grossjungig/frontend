import React, { Component } from "react";
import styles from './index.module.css';
import { fullBlock } from '../../../shared/index.module.css';
import axios from '../../../axios';
import newAxios from 'axios';
import { connect } from 'react-redux';
import offeredhelps from '../../../assets/checkbox/help';
import Checkbox from '../../../components/Checkbox/Checkbox'
import { dispatchCheckAuth } from "../../../store/auth/thunks";
import dummyAvatar from '../../../assets/images/dummy-avatar.jpg'
import { generateBase64FromImage } from '../../../utils';
import ProfileLocales from "../../../locales/locales.profile.json";


class AddProfile extends Component {
  state = {
    name: "",
    age: "",
    gender: "",
    district: "",
    description: "",
    price: "",
    phoneNumber: "",
    offeredHelp: [],

    avatarUrl: '',
    avatarPreview: dummyAvatar,
    avatarFile: {},
    avatarPreviewErr: '',
    signedRequest: ''
  };

  
  setFormState = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleHelp = ({ target }) => {
    const help = target.name;
    const isChecked = target.checked;
    if (isChecked) {
      this.setState({ offeredHelp: [...this.state.offeredHelp, help] })
      } else {
      this.setState({ offeredHelp:  this.state.offeredHelp.filter((item) => item !== help) })
      }
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
        gender: this.state.gender,
        district: this.state.district,
        description: this.state.description,
        price: this.state.price,
        avatarUrl: this.state.avatarUrl,
        help: this.state.offeredHelp
      };
    
    axios.post('api/addProfile', obj).then((res) => {
        this.props.refreshUser();
        this.props.history.push(`/profile/${res.data._id}`);
      }).catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { name, age, gender, price, description, district, avatarPreview, avatarPreviewErr, message } = this.state;
    const lang = localStorage.getItem("lang");
    console.log('helps',offeredhelps[lang] )
    return (
      <div className={fullBlock}>
        <div className={styles.main}>
          <div className={styles.msg}>
          {ProfileLocales.info[lang]}  
          </div>

          <div className={styles.form}>
            <div className={styles.formCtrl}>
              <label htmlFor="name"> {ProfileLocales.name2[lang]} </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={this.setFormState}
                className={styles.input}
              />
            </div>

            <div className={styles.formCtrl}>
              <label htmlFor="gender"> {ProfileLocales.gender[lang]}  </label>
              <select
                name="gender"
                type="select"
                value={gender}
                onChange={this.setFormState}
                className={styles.input}
              >
                <option  value="" disabled> {ProfileLocales.select[lang]}  </option>
                <option value="male"> {ProfileLocales.male[lang]}  </option>
                <option value="female"> {ProfileLocales.female[lang]}  </option>
                <option value="divers"> {ProfileLocales.divers[lang]}  </option>
              </select>
            </div>

            <div className={styles.formCtrl}>
              <label htmlFor="age"> {ProfileLocales.age[lang]}  </label>
              <input
                type="text"
                name="age"
                id="age"
                value={age}
                onChange={this.setFormState}
                className={styles.input}
              />
            </div>

            <div className={styles.formCtrl}>
              <label htmlFor="price"> {ProfileLocales.requestedPrice[lang]}  </label>
              <input
                type="number"
                name="price"
                id="price"
                value={price}
                onChange={this.setFormState}
                className={styles.input}
              />
            </div>

            <div className={styles.formCtrl}>
              <label htmlFor="district" > {ProfileLocales.about[lang]} </label>
              <textarea
                type="text"
                name="description"
                id="description"
                value={description}
                onChange={this.setFormState}
                maxLength="120"
                rows="3"
                className={styles.input}
              />
            </div>

            <div className={styles.formCtrl}>
              <label htmlFor="help"> {ProfileLocales.offeredHelp[lang]} </label>
              <div>
              {offeredhelps[lang].map(help => (
                <Checkbox key={help.name} item={help} handleHelp={this.handleHelp} />
              ))}
              </div>
            </div>

            <div className={styles.formCtrl}>
              <label htmlFor="select"> {ProfileLocales.district[lang]} </label>
              <select
                name="district"
                type="select"
                value={district}
                onChange={this.setFormState}
                placeholder="Select"
                className={styles.input}
              >
                <option value="" disabled> {ProfileLocales.select[lang]}  </option>
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
              <label > {ProfileLocales.picture[lang]}  Profile picture</label>
              <img src={avatarPreview} className={styles.avatarImg} alt="avatar"/>
              <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={this.handleAvatarChange}
                  className={styles.input}
              />
              <span className="avatar-preview-err">{avatarPreviewErr}</span>
            </div>

            <div className={styles.msg}>
            {ProfileLocales.policy[lang]} 
            </div>

            <div>
              <button type="submit" className={styles.btn} onClick={this.onSubmit} >{ProfileLocales.submit[lang]} </button>
            </div>
          </div>
          {message && <p>{message}</p>}
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
