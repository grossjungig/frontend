import React, { Component } from "react";
import styles from './index.module.css';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from '../../../axios';
import newAxios from 'axios';
import { connect } from 'react-redux';
import offeredhelps from '../../../assets/profile/help';
import MuiPhoneNumber from "material-ui-phone-number";
import listhobbies from '../../../assets/profile/hobbies';
import districtBerlin from '../../../assets/profile/district';
import { dispatchCheckAuth } from "../../../store/auth/thunks";
import dummyAvatar from '../../../assets/images/dummy-avatar.jpg'
import { generateBase64FromImage } from '../../../utils';
import ProfileLocales from "../../../locales/locales.profile.json";

class AddProfile extends Component {
  state = {
    name: "",
    dob: null,
    gender: "",
    langs: "",
    occupation: "",
    doYouSmoke: "",
    accomodation: "",
    pets: "",
    theHobbies: [],
    otherhobbies: "",
    offeredHelp: [],
    otherhelp: "",
    rooms: "",
    size: "",
    price: "",
    exptdDate: "",
    exptdDuration: "",
    districtList: "",
    partner: "",
    findaboutus: "",
    liketoshare: "",
    phonenumber: null,
    avatarUrl: '',
    avatarPreview: dummyAvatar,
    avatarFile: {},
    avatarPreviewErr: '',
    signedRequest: '',
    messages: [],
  };


  setFormState = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };


  handleHelp = ({ target }) => {
    const help = target.name;
    const isChecked = target.checked;
    console.log(isChecked);
    if (isChecked) {
      this.setState({ offeredHelp: [...this.state.offeredHelp, help] });
    } else {
      this.setState({ offeredHelp: this.state.offeredHelp.filter((item) => item !== help) });
    }

  };


  handleHobby = ({ target }) => {
    const hobby = target.name;
    const isChecked = target.checked;
    console.log(isChecked);
    if (isChecked) {
      this.setState({ theHobbies: [...this.state.theHobbies, hobby] });
    } else {
      this.setState({ theHobbies: this.state.theHobbies.filter((item) => item !== hobby) });
    }

  };

  handleDistrict = ({ target }) => {
    const district = target.name;
    const isChecked = target.checked;
    console.log(isChecked);
    if (isChecked) {
      this.setState({ districtList: [...this.state.districtList, district] });
    } else {
      this.setState({ districtList: this.state.districtList.filter((item) => item !== district) });
    }

  };


  handleCheckHobby = (event) => {
    this.setState({
      hobbychecked: event.target.checked
    })

  }

  handleCheckHelp = (event) => {
    this.setState({
      helpchecked: event.target.checked
    })

  }

  handleChangeRooms = (event) => {
    this.setState(
      {
        rooms: event.target.value
      }
    )
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
      this.setState({ avatarPreviewErr: err.message });
    }
  }

  onSubmitForm = (event) => {
    event.preventDefault();
    // Direct Upload to AWS S3
    const { signedRequest, avatarFile } = this.state;
    newAxios.put(signedRequest, avatarFile)
      .catch(err => { this.setState({ avatarPreviewErr: err.message }) });

    const obj = {
      name: this.state.name,
      dob: this.state.dob,
      gender: this.state.gender,
      langs: this.state.langs,
      occupation: this.state.occupation,
      doYouSmoke: this.state.doYouSmoke,
      accomodation: this.state.accomodation,
      pets: this.state.pets,
      hobby: this.state.theHobbies,
      otherhobbies: this.state.otherhobbies,
      help: this.state.offeredHelp,
      otherhelp: this.state.otherhelp,
      rooms: this.state.rooms,
      size: this.state.size,
      price: this.state.price,
      exptdDate: this.state.exptdDate,
      exptdDuration: this.state.exptdDuration,
      district: this.state.districtList,
      partner: this.state.partner,
      findaboutus: this.state.findaboutus,
      liketoshare: this.state.liketoshare,
      phonenumber: this.state.phonenumber,
      avatarUrl: this.state.avatarUrl,
    };

    axios.post('api/addProfile', obj).then((res) => {
      this.props.refreshUser();
      this.props.history.push(`/profile/${res.data._id}`);
    }).catch((err) => {
      console.log(err);
      this.setState({ messages: err.response.data.data });
    });


  };


  render() {
    const { name, dob, gender, langs, occupation, doYouSmoke, accomodation, pets, hobbies, otherhobbies, helps, otherhelp, room, size, price, exptdDate, exptdDuration, district, partner, findaboutus, liketoshare, phonenumber, avatarPreview, avatarPreviewErr, messages } = this.state;
    const lang = localStorage.getItem("lang");
    console.log('helps', offeredhelps[lang]);
    console.log(hobbies);
    let errorMessages = <p>Hello World</p>;
    if (this.state.messages) {
      errorMessages = <ul className={styles["signup-errs"]}>{
        this.state.messages.map((msg, i) => <li key={i}>{ProfileLocales.errors[msg][lang]}</li>)
      }</ul>
    }

    const sex = [
      {
        value: "male",
        label: ProfileLocales.male[lang],
      },
      {
        value: "female",
        label: ProfileLocales.female[lang],
      },
      {
        value: "divers",
        label: ProfileLocales.divers[lang],
      },
    ];
    const binary = [
      {
        value: "yes",
        label: lang === "de" ? "Ja" : "Yes",
      },
      {
        value: "no",
        label: lang === "de" ? "Nein" : "No",
      },
    ];

    return (
      <div className={styles.fullBlock}>
        <div className={styles.upperHead}>
          <div className={styles.lineone}>
            <ArrowBackIcon className={styles.arrowBackIcon} onClick={this.props.history.goBack} />
            <span className={styles.addRequest}>Add My Request</span>
          </div>
          <div className={styles.msg}>
            {ProfileLocales.info[lang]}
          </div>
        </div>
        <div className={styles.main}>
          < div className={styles.profiletitle}>{ProfileLocales.title[lang]}</div>
          <form className={styles.form} onSubmit={this.onSubmitForm}>
            <div className={styles.quesPrimary}>
              <div className={styles.name}>
                <label htmlFor="name"> {ProfileLocales.name[lang]} </label>
                <TextField name="name" id="name" value={name}
                  onChange={this.setFormState}
                  variant="outlined" size="small" required className={styles.input} />
              </div>

              <div className="dob">
                <label htmlFor="dob"> {ProfileLocales.dob[lang]} </label>
                {/* <TextField name="dob" id="dob" value={dob} onChange={(date) => {
                  this.setFormState(date);
                  console.log(date);
                }} variant="outlined"
                  size="small" className={styles.input} /> */}
                <DatePicker id="dob" className={styles.dates} selected={dob} onChange={(e) => {
                  this.setState({ dob: e });
                }} isClearable showYearDropdown scrollableMonthYearDropdown required />
              </div>

              <div className={styles.gender}>
                <label htmlFor="gender"> {ProfileLocales.gender[lang]} </label>
                <TextField name="gender" id="gender" value={gender}
                  onChange={this.setFormState} select
                  variant="outlined" size="small" className={styles.input} required>
                  {sex.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              <div className={styles.langs}>
                <label htmlFor="langs"> {ProfileLocales.langs[lang]} </label>
                <TextField name="langs" id="langs" value={langs}
                  onChange={this.setFormState}
                  variant="outlined" size="small" className={styles.input} required  error={
                    this.state.messages.includes('INVALID_LANGUAGE') ||
                    this.state.messages.includes('INVALID_LANGUAGE_TYPE')
                  }/>
              </div>

              <div className={styles.occupation}>
                <label htmlFor="occupation"> {ProfileLocales.occupation[lang]} </label>
                <TextField name="occupation" id="occupation" value={occupation}
                  onChange={this.setFormState}
                  variant="outlined" size="small" className={styles.input} required />
              </div>

              <div className={styles.doYouSmoke}>
                <label htmlFor="doYouSmoke"> {ProfileLocales.doYouSmoke[lang]} </label>
                <TextField name="doYouSmoke" select id="doYouSmoke" value={doYouSmoke}
                  onChange={this.setFormState}
                  variant="outlined" size="small" className={styles.input} required >
                  {binary.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              <div className={styles.accomodation}>
                <label htmlFor="accomodation"> {ProfileLocales.accomodation[lang]} </label>
                <TextField name="accomodation" select id="accomodation" value={accomodation}
                  onChange={this.setFormState}
                  variant="outlined" size="small" className={styles.input} required>
                  {binary.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              <div className={styles.pets}>
                <label htmlFor="pets"> {ProfileLocales.pets[lang]} </label>
                <TextField name="pets" select id="pets" value={pets}
                  onChange={this.setFormState}
                  variant="outlined" size="small" className={styles.input}>
                  {binary.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>

            <div className={styles.hobbySection}>
              <div className={styles.hobbyText}>
                <label htmlFor="hobby"> {ProfileLocales.hobbyText[lang]}
                </label>
              </div>

              <div className={styles.hobby}>
                {listhobbies[lang].map(hobby => (
                  <div>
                    <Checkbox key={hobby.key} color="primary"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                      name={hobby.name} onChange={this.handleHobby} />
                    <label>{hobby.label}</label>
                  </div>
                ))}
                <div>
                  <Checkbox
                    color="secondary"
                    hobbychecked={this.state.checked}
                    onChange={this.handleCheckHobby}
                  /><label>{lang === "de" ? "Sonstiges" : "Others"}</label>
                </div>
              </div>

              <div className={styles.hobbyother}>
                <TextField name="otherhobbies" id="otherhobbies" label={lang === "de" ? "Bitte schreiben Sie hier" : "Please write others"} value={otherhobbies}
                  onChange={this.setFormState} size="small" disabled={!this.state.hobbychecked ? true : false}
                  variant="outlined" className={styles.inputRight} />
              </div>

            </div>


            <div className={styles.helpSection}>
              <div className={styles.helpText}>
                <label htmlFor="hobby"> {ProfileLocales.helpText[lang]}
                </label>
              </div>

              <div className={styles.help}>
                {offeredhelps[lang].map(help => (
                  <div>
                    <Checkbox key={help.key} color="primary"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                      name={help.name} onChange={this.handleHelp} />
                    <label>{help.label}</label>
                  </div>
                ))}
                <div>
                  <Checkbox
                    color="secondary"
                    helpchecked={this.state.checked}
                    onChange={this.handleCheckHelp}
                  /><label>{lang === "de" ? "Sonstiges" : "Others"}</label>
                </div>
              </div>


              <div className={styles.helpother}>
                <TextField name="otherhelp" id="otherhelp" label={lang === "de" ? "Bitte schreiben Sie hier" : "Please write others"} value={otherhelp}
                  onChange={this.setFormState} disabled={!this.state.helpchecked ? true : false}
                  size="small" variant="outlined" className={styles.inputRight} />
              </div>
            </div>

            <div className={styles.roomSection}>
              <div className={styles.roomHeading}>{ProfileLocales.RoomHeading[lang]}</div>
              <div className={styles.roomsubHeading}>{ProfileLocales.Roomsubheading[lang]}</div>
              <div>
                <RadioGroup aria-label="rooms" name="rooms" defaultValue='one-room-flat' value={this.value} required onChange={this.handleChangeRooms}>
                  <FormControlLabel value="one-room-flat" control={<Radio color="primary" />} label={ProfileLocales.oneroom[lang]}
                    className={styles.room} />
                  <FormControlLabel value="two-room-flat" control={<Radio color="primary" />} label={ProfileLocales.tworoom[lang]}
                    className={styles.room} />
                </RadioGroup>
              </div>
              <div className={styles.roomQuestions}>
                <div className={styles.size}>
                  <label htmlFor="size"> {ProfileLocales.size[lang]} </label>
                  <TextField name="size" id="size" value={size}
                    onChange={this.setFormState}
                    variant="outlined" size="small" className={styles.input} required />
                </div>
                <div className={styles.price}>
                  <label htmlFor="price"> {ProfileLocales.price[lang]} </label>
                  <TextField name="price" id="price" value={price}
                    onChange={this.setFormState}
                    variant="outlined" size="small" className={styles.input} required />
                </div>
                <div className={styles.exptdDate}>
                  <label htmlFor="exptdDate"> {ProfileLocales.exptdDate[lang]} </label>
                  <TextField name="exptdDate" id="exptdDate" value={exptdDate}
                    onChange={this.setFormState}
                    variant="outlined" size="small" className={styles.input} required />
                </div>
                <div className={styles.exptdDuration}>
                  <label htmlFor="exptdDuration"> {ProfileLocales.exptdDuration[lang]} </label>
                  <TextField name="exptdDuration" id="exptdDuration" value={exptdDuration}
                    onChange={this.setFormState}
                    variant="outlined" size="small" className={styles.input} required />
                </div>


              </div>
            </div>

            <div className={styles.districtSection}>
              <div className={styles.district}>
                <label htmlFor="district">  {ProfileLocales.district[lang]}
                </label>
              </div>

              <div className={styles.districtc}>
                {districtBerlin[lang].map(e => (
                  <div className={styles.districtlabel}>
                    <Checkbox key={e.name} color="primary"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                      name={e.name} onChange={this.handleDistrict} />
                    <label>{e.label}</label>
                  </div>
                ))}
              </div>
            </div>


            <div className={styles.partnerSection}>
              <div className={styles.partnerHeading}>{ProfileLocales.PartnerHeading[lang]}</div>
              <div className={styles.PartnerQuestions}>
                <div className={styles.partner}>
                  <label htmlFor="partner"> {ProfileLocales.partner[lang]} </label>
                  <TextField name="partner" id="partner" value={partner}
                    onChange={this.setFormState}
                    variant="outlined" size="small" className={styles.input} required />
                </div>
              </div>
            </div>

            <div className={styles.extraSection}>
              <div className={styles.extraHeading}>{ProfileLocales.ExtraHeading[lang]}</div>
              <div className={styles.ExtraQuestions}>
                <div className={styles.findaboutus}>
                  <label htmlFor="findaboutus"> {ProfileLocales.findaboutus[lang]} </label>
                  <TextField name="findaboutus" id="findaboutus" value={findaboutus}
                    onChange={this.setFormState}
                    variant="outlined" size="small" className={styles.input} />
                </div>
                <div className={styles.liketoshare}>
                  <label htmlFor="liketoshare"> {ProfileLocales.liketoshare[lang]} </label>
                  <TextField name="liketoshare" id="liketoshare" value={liketoshare}
                    onChange={this.setFormState}
                    variant="outlined" size="small" className={styles.input} />
                </div>
                <div className={styles.phonenumber}>
                  <label htmlFor="phonenumber"> {ProfileLocales.phonenumber[lang]} </label>

                  <MuiPhoneNumber
                    name="phonenumber"
                    id="phonenumber"
                    data-cy="user-phone"
                    defaultCountry={"in"}
                    value={phonenumber}
                    onChange={(event) =>
                      this.setState({
                        phonenumber: event
                      })}
                    variant="outlined" size="small" className={styles.input}
                  />
                </div>
              </div>
            </div>



            <div className={styles.photo}>
              <label > {ProfileLocales.picture[lang]}</label>
              <img src={avatarPreview} className={styles.avatarImg} alt="avatar" />
              <div className={styles.profileBanner}>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={this.handleAvatarChange}
                  className={styles.profileButton}

                />
                <div className={styles.banner}>
                  Max {lang === "de" ? 'Größe' : 'Size'}: 5MB
                </div>
              </div>
              <span className={styles["avatar-preview-err"]}>{avatarPreviewErr}</span>
            </div>

            <div className={styles.msgBottom}>
              {ProfileLocales.policy[lang]}
            </div>

            <div className={styles.buttonGroup}>
              <div className={styles.leftButton}>
                <button type="submit" className={styles.btnBlue} >{ProfileLocales.submit[lang]} </button>
              </div>
              <div className={styles.rightButton}>
                <button type="button" className={styles.btnWhite} onClick={this.props.history.goBack} >{ProfileLocales.dismiss[lang]} </button>
              </div>
            </div>
          </form>
          {messages && <p>{messages}</p>}

        </div>
      </div >
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
