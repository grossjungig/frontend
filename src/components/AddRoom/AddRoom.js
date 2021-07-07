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
import 'react-datepicker/dist/react-datepicker.css';
import axios from '../../axios';
import newAxios from 'axios';
import { connect } from 'react-redux';
import offeredhelps from '../../assets/profile/help';
import MuiPhoneNumber from "material-ui-phone-number";
import listhobbies from '../../assets/profile/hobbies';
import districtBerlin from '../../assets/profile/district';
import dummyAvatar from '../../assets/images/dummy-avatar.jpg'
import { dispatchCheckAuth } from "../../store/auth/thunks";
import { generateBase64FromImage } from '../../utils';
import ProfileLocales from "../../locales/locales.addroom.json";

class addProfileSenior extends Component {
    state = {
        dob: null,
        roomTitle: "",
        gender: "",
        language: "",
        occupation: "",
        smoke: "",
        pets: "",
        alone: "",
        hobbies: [],
        otherHobbies: "",
        expectedHelp: [],
        otherHelp: "",
        address: "",
        accomodation: "",
        rooms: "",
        size: "",
        postcode: "",
        district: "",
        duration: "",
        price: "",
        moveIn: null,
        registration: "",
        childrenAllowed: "",
        smokeAllowed: "",
        petsAllowed: "",
        idealFlatmate: "",
        howFound: "",
        additionalInfo: "",
        phoneNumber: "",
        avatarUrl: '',
        avatarPreview: dummyAvatar,
        avatarFile: {},
        avatarPreviewErr: '',
        signedRequest: '',
        messages: []
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
            this.setState({ expectedHelp: [...this.state.expectedHelp, help] });
        } else {
            this.setState({ expectedHelp: this.state.expectedHelp.filter((item) => item !== help) });
        }

    };


    handleHobby = ({ target }) => {
        const hobby = target.name;
        const isChecked = target.checked;
        if (isChecked) {
            this.setState({ hobbies: [...this.state.hobbies, hobby] });
        } else {
            this.setState({ hobbies: this.state.hobbies.filter((item) => item !== hobby) });
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
            .catch(err => { this.setState({ avatarPreviewErr: err.message }) })
        const obj = {
            dob: this.state.dob,
            roomTitle: this.state.roomTitle,
            gender: this.state.gender,
            language: this.state.language,
            occupation: this.state.occupation,
            smoke: this.state.smoke,
            pets: this.state.pets,
            alone: this.state.alone,
            hobbies: this.state.hobbies,
            otherHobbies: this.state.otherHobbies,
            expectedHelp: this.state.expectedHelp,
            otherHelp: this.state.otherHelp,
            address: this.state.address,
            accomodation: this.state.accomodation,
            rooms: this.state.rooms,
            size: this.state.size,
            postcode: this.state.postcode,
            district: this.state.district,
            duration: this.state.duration,
            price: this.state.price,
            moveIn: this.state.moveIn,
            registration: this.state.registration,
            childrenAllowed: this.state.childrenAllowed,
            smokeAllowed: this.state.smokeAllowed,
            petsAllowed: this.state.petsAllowed,
            idealFlatmate: this.state.idealFlatmate,
            howFound: this.state.howFound,
            additionalInfo: this.state.additionalInfo,
            avatarUrl: this.state.avatarUrl,
        };
        if (this.state.phoneNumber && this.state.phoneNumber.length > 3) {
            obj.phoneNumber = this.state.phoneNumber
        } else {
            delete obj.phoneNumber
        }

        axios.post('api/addRoom', obj).then((response) => {
            const roomId = response.data._id
            this.props.history.push(`/berlin/${roomId}`)
        }).catch((err) => {
            this.setState({ messages: err.response.data.data });
        });


    };


    render() {

        var name;
        if (this.props.fetchedUser) {
            name = this.props.fetchedUser.name
        }
        const { dob, roomTitle, gender, language, occupation, smoke, pets, alone, otherHobbies, otherHelp, address, size, postcode, district, duration, price, moveIn, registration, childrenAllowed, smokeAllowed, petsAllowed, idealFlatmate, howFound, additionalInfo, phoneNumber, avatarPreview, messages } = this.state;
        const lang = localStorage.getItem("lang");


        const sex = [
            {
                value: "Male",
                label: ProfileLocales.male[lang],
            },
            {
                value: "Female",
                label: ProfileLocales.female[lang],
            },
            {
                value: "Divers",
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

        const registrationOptions = [
            {
                value: "Yes, I am the owner",
                label: lang === "de" ? "Ja, ich bin der Eigentümer" : "Yes, I am the owner",
            },
            {
                value: "Yes, I am allowed sublet the room / apartment",
                label: lang === "de" ? "Ja, ich darf das Zimmer/die Wohnung untervermieten" : "Yes, I am allowed sublet the room / apartment",
            },
            {
                value: "Yes, with landlord/lady's approval",
                label: lang === "de" ? "Ja, mit Zustimmung von der/dem VermieterIn" : "Yes, with landlord/lady's approval",
            },
            {
                value: " I Don't Know",
                label: lang === "de" ? "Ich weiß nicht" : "I Don't Know",
            },
            {
                value: "No",
                label: lang === "de" ? "Nein" : "No",
            }
        ]

        return (

            <div className={styles.fullBlock}>
                <div className={styles.upperHead}>
                    <div className={styles.lineone}>
                        <ArrowBackIcon className={styles.arrowBackIcon} onClick={this.props.history.goBack} />
                        <span className={styles.addRequest}>{ProfileLocales.request[lang]}</span>
                    </div>
                    <div className={styles.msg}>
                        {ProfileLocales.info[lang]}
                    </div>
                </div>
                <div className={styles.main}>
                    < div className={styles.profiletitle}>{name + ProfileLocales.title[lang]}</div>
                    <form className={styles.form} onSubmit={this.onSubmitForm}>
                        <div className={styles.quesPrimary}>

                            <div className="dob">
                                <label htmlFor="dob"> <span className={styles.red}>*</span> {ProfileLocales.dob[lang]} </label>
                                <DatePicker id="dob" className={dob ? styles.dates : [`${styles.dates} ${styles["dates-error"]}`]} selected={dob} onChange={(e) => {
                                    this.setState({ dob: e });
                                }} placeholderText={lang === "en" ? "Select Your Date Of Birth" : "Wählen Sie Ihr Geburtsdatum"} isClearable showYearDropdown scrollableMonthYearDropdown error={this.state.messages.includes('INVALID_DOB')} />
                            </div>

                            <div className={styles.gender}>
                                <label htmlFor="gender"> <span className={styles.red}>* </span>{ProfileLocales.gender[lang]} </label>
                                <TextField name="gender" id="gender" value={gender}
                                    onChange={this.setFormState} select
                                    variant="outlined" size="small" className={styles.input} error={
                                        this.state.messages.includes('INVALID_GENDER')}>
                                    {sex.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>

                            <div className={styles.langs}>
                                <label htmlFor="language"><span className={styles.red}>* </span>{ProfileLocales.langs[lang]} </label>
                                <TextField name="language" id="language" value={language}
                                    onChange={this.setFormState}
                                    variant="outlined" size="small" className={styles.input} error={
                                        this.state.messages.includes('INVALID_LANGUAGE') ||
                                        this.state.messages.includes('INVALID_LANGUAGE_TYPE')
                                    } />
                            </div>

                            <div className={styles.occupation}>
                                <label htmlFor="occupation"> {ProfileLocales.occupation[lang]} </label>
                                <TextField name="occupation" id="occupation" value={occupation}
                                    onChange={this.setFormState}
                                    variant="outlined" size="small" className={styles.input} />
                            </div>

                            <div className={styles.doYouSmoke}>
                                <label htmlFor="smoke"><span className={styles.red}>* </span>{ProfileLocales.doYouSmoke[lang]} </label>
                                <TextField name="smoke" select id="smoke" value={smoke}
                                    onChange={this.setFormState}
                                    variant="outlined" size="small" className={styles.input} error={
                                        this.state.messages.includes('INVALID_SMOKE')} >
                                    {binary.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                    <MenuItem value="Yes but never in the flat">
                                        {lang === "en" ? "Yes but never in the flat" : "aber nie Zuhause"}
                                    </MenuItem>
                                </TextField>
                            </div>

                            <div className={styles.alone}>
                                <label htmlFor="alone">{ProfileLocales.alone[lang]} </label>
                                <TextField name="alone" select id="alone" value={alone}
                                    onChange={this.setFormState}
                                    variant="outlined" size="small" className={styles.input}>
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
                                <label htmlFor="hobbies"> <span className={styles.red}>*</span> {ProfileLocales.hobbyText[lang]}
                                </label>
                            </div>
                            <div>
                                {this.state.messages.includes('INVALID_HOBBIES') ? <p className={styles.red}> {ProfileLocales.hobbyError[lang]} </p> : null}
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
                                <TextField name="otherHobbies" id="otherHobbies" label={lang === "de" ? "Bitte schreiben Sie hier" : "Please write others"} value={otherHobbies}
                                    onChange={this.setFormState} size="small" disabled={!this.state.hobbychecked ? true : false}
                                    variant="outlined" className={styles.inputRight} />
                            </div>

                        </div>


                        <div className={styles.helpSection}>
                            <div className={styles.helpText}>
                                <label htmlFor="hobby"> <span className={styles.red}>*</span> {ProfileLocales.helpText[lang]}
                                </label>
                            </div>
                            <div>
                                {this.state.messages.includes('INVALID_HELP') ? <p className={styles.red}> {ProfileLocales.helpError[lang]} </p> : null}
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
                                <TextField name="otherHelp" id="otherHelp" label={lang === "de" ? "Bitte schreiben Sie hier" : "Please write others"} value={otherHelp}
                                    onChange={this.setFormState} disabled={!this.state.helpchecked ? true : false}
                                    size="small" variant="outlined" className={styles.inputRight} />
                            </div>
                        </div>

                        <div className={styles.roomSection}>
                            <div className={styles.roomHeading}>{name + ProfileLocales.RoomHeading[lang]}</div>
                            <div className={styles.roomsubHeading}> <span className={styles.red}>*</span> {ProfileLocales.Roomsubheading[lang]}</div>
                            <div>
                                {this.state.messages.includes('INVALID_ROOMS') ? <p className={styles.red}> {ProfileLocales.selectError[lang]} </p> : null}
                            </div>
                            <div>
                                <RadioGroup aria-label="accomodation" name="accomodation" value={this.value} onChange={this.handleChangeRooms}>
                                    <FormControlLabel value="One-room-flat" control={<Radio color="primary" />} label={ProfileLocales.oneroom[lang]}
                                        className={styles.room} />
                                    <FormControlLabel value="Two-room-flat" control={<Radio color="primary" />} label={ProfileLocales.tworoom[lang]}
                                        className={styles.room} />
                                    <FormControlLabel value="Studio" control={<Radio color="primary" />} label={ProfileLocales.studio[lang]}
                                        className={styles.room} />
                                    <FormControlLabel value="More" control={<Radio color="primary" />} label={ProfileLocales.more[lang]}
                                        className={styles.room} />
                                </RadioGroup>
                            </div>

                            <div className={styles.roomQuestions}>
                                <div className={styles.roomTitle}>
                                    <label htmlFor="roomTitle"> {ProfileLocales.roomTitle[lang]} </label>
                                    <TextField name="roomTitle" id="roomTitle" value={roomTitle}
                                        onChange={this.setFormState}
                                        variant="outlined" size="small" className={styles.input} />
                                </div>
                                <div className={styles.size}>
                                    <label htmlFor="size"> {ProfileLocales.size[lang]} </label>
                                    <TextField name="size" id="size" value={size}
                                        onChange={this.setFormState}
                                        variant="outlined" size="small" className={styles.input} />
                                </div>
                                <div className={styles.price}>
                                    <label htmlFor="price"> <span className={styles.red}>*</span> {ProfileLocales.price[lang]} </label>
                                    {this.state.messages.includes('INVALID_PRICE') ? <p className={styles.red}> {ProfileLocales.numberError[lang]} </p> : null}
                                    <TextField name="price" id="price" value={price}
                                        onChange={this.setFormState}
                                        variant="outlined" size="small" className={styles.input} error={this.state.messages.includes('INVALID_PRICE')} />
                                </div>
                                <div className={styles.duration}>
                                    <label htmlFor="duration"> <span className={styles.red}>*</span> {ProfileLocales.duration[lang]} </label>
                                    {this.state.messages.includes('INVALID_DURATION') ? <p className={styles.red}> {ProfileLocales.numberError[lang]} </p> : null}
                                    <TextField name="duration" id="duration" value={duration}
                                        onChange={this.setFormState}
                                        variant="outlined" size="small" className={styles.input} error={this.state.messages.includes('INVALID_DURATION')} />
                                </div>

                                {/*Check*/}
                                <div className={styles.exptdDate}>
                                    <label htmlFor="moveIn"> <span className={styles.red}>*</span> {ProfileLocales.exptdDate[lang]} </label>
                                    <DatePicker id="moveIn" className={moveIn ? styles.dates : [`${styles.dates} ${styles["dates-error"]}`]} selected={moveIn} onChange={(e) => {
                                        this.setState({ moveIn: e });
                                    }} minDate={new Date()} placeholderText={lang === "de" ? "Ein Datum auswählen" : "Select a date"} isClearable showYearDropdown scrollableMonthYearDropdown error={this.state.messages.includes('INVALID_MOVEIN')} />
                                </div>

                                {/*Check*/}
                                <div className={styles.address}>
                                    <label htmlFor="address"> <span className={styles.red}>*</span> {ProfileLocales.address[lang]} </label>
                                    {this.state.messages.includes('INVALID_ADDRESS') ? <p className={styles.red}> {ProfileLocales.numberError[lang]} </p> : null}
                                    <TextField name="address" id="address" value={address}
                                        onChange={this.setFormState}
                                        variant="outlined" size="small" className={styles.input} error={this.state.messages.includes('INVALID_ADDRESS')} />
                                </div>
                                <div className={styles.postcode}>
                                    <label htmlFor="postcode"> <span className={styles.red}>*</span> {ProfileLocales.postcode[lang]} </label>
                                    {this.state.messages.includes('INVALID_POSTCODE') ? <p className={styles.red}> {ProfileLocales.numberError[lang]} </p> : null}
                                    <TextField name="postcode" id="postcode" value={postcode}
                                        onChange={this.setFormState}
                                        variant="outlined" size="small" className={styles.input} error={this.state.messages.includes('INVALID_POSTCODE')} />
                                </div>
                                <div className={styles.district}>
                                    <label htmlFor="district"> <span className={styles.red}>*</span> {ProfileLocales.district[lang]}</label>
                                    <div>
                                        {this.state.messages.includes('INVALID_DISTRICT') ? <p className={styles.red}> {ProfileLocales.selectError[lang]} </p> : null}
                                    </div>
                                    <TextField name="district" select id="district" value={district}
                                        onChange={this.setFormState}
                                        variant="outlined" size="small" className={styles.input} error={
                                            this.state.messages.includes('INVALID_DISTRICT')} >
                                        {districtBerlin[lang].slice(0, 12).map((option) => (
                                            <MenuItem key={option.name} value={option.name}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div className={styles.registration}>
                                    <label htmlFor="registration"> <span className={styles.red}>*</span> {ProfileLocales.registration[lang]} </label>
                                    <div>
                                        {this.state.messages.includes('INVALID_REGISTRATION') ? <p className={styles.red}> {ProfileLocales.selectError[lang]} </p> : null}
                                    </div>
                                    <TextField name="registration" select id="registration" value={registration}
                                        onChange={this.setFormState}
                                        variant="outlined" size="small" className={styles.input} error={this.state.messages.includes('INVALID_REGISTRATION')}>
                                        {registrationOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>

                            </div>
                        </div>
                        <div className={styles.partnerSection}>
                            <div className={styles.partnerHeading}>{name + ProfileLocales.PartnerHeading[lang]}</div>
                            <div className={styles.PartnerQuestions}>
                                <div className={styles.partner}>
                                    <label htmlFor="idealFlatmate"> <span className={styles.red}>*</span> {ProfileLocales.partner[lang]} </label>
                                    <TextField name="idealFlatmate" id="idealFlatmate" value={idealFlatmate}
                                        onChange={this.setFormState}
                                        variant="outlined" size="small" className={styles.input} error={this.state.messages.includes('INVALID_IDEAL_FLATMATE')} />
                                </div>
                                <div className={styles.childrenAllowed}>
                                    <label htmlFor="childrenAllowed"> {ProfileLocales.childrenAllowed[lang]} </label>
                                    <TextField name="childrenAllowed" select id="childrenAllowed" value={childrenAllowed}
                                        onChange={this.setFormState}
                                        variant="outlined" size="small" className={styles.input}>
                                        {binary.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div className={styles.smokeAllowed}>
                                    <label htmlFor="smokeAllowed"> {ProfileLocales.smokeAllowed[lang]} </label>
                                    <TextField name="smokeAllowed" select id="smokeAllowed" value={smokeAllowed}
                                        onChange={this.setFormState}
                                        variant="outlined" size="small" className={styles.input} error={
                                            this.state.messages.includes('INVALID_SMOKEALLOWED')} >
                                        {binary.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div className={styles.petsAllowed}>
                                    <label htmlFor="petsAllowed"> {ProfileLocales.petsAllowed[lang]} </label>
                                    <TextField name="petsAllowed" select id="petsAllowed" value={petsAllowed}
                                        onChange={this.setFormState}
                                        variant="outlined" size="small" className={styles.input} error={
                                            this.state.messages.includes('INVALID_PETSALLOWED')} >
                                        {binary.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                            </div>
                        </div>

                        <div className={styles.extraSection}>
                            <div className={styles.extraHeading}>{ProfileLocales.ExtraHeading[lang]}</div>
                            <div className={styles.ExtraQuestions}>
                                <div className={styles.findaboutus}>
                                    <label htmlFor="howFound"> {ProfileLocales.findaboutus[lang]} </label>
                                    <TextField name="howFound" id="howFound" value={howFound}
                                        onChange={this.setFormState}
                                        variant="outlined" size="small" className={styles.input} />
                                </div>
                                <div className={styles.liketoshare}>
                                    <label htmlFor="additionalInfo"> {ProfileLocales.liketoshare[lang]} </label>
                                    <TextField name="additionalInfo" id="additionalInfo" value={additionalInfo}
                                        onChange={this.setFormState}
                                        variant="outlined" size="small" className={styles.input} />
                                </div>
                                <div className={styles.phonenumber}>
                                    <label htmlFor="phoneNumber"> {ProfileLocales.phonenumber[lang]} </label>
                                    {this.state.messages.includes('INVALID_PHONE_NUMBER') ? <p className={styles.red}> {ProfileLocales.numberError[lang]} </p> : null}

                                    <MuiPhoneNumber
                                        name="phonenumber"
                                        id="phonenumber"
                                        data-cy="user-phone"
                                        defaultCountry={"de"}
                                        value={phoneNumber}
                                        onChange={(event) =>
                                            this.setState({
                                                phoneNumber: event.split(' ').join('')
                                            })}
                                        variant="outlined" size="small" className={styles.input}
                                        error={this.state.messages.includes('INVALID_PHONE_NUMBER')}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={styles.photo}>
                            <label > {ProfileLocales.picture[lang]}</label>
                            <div className={styles.profilePictureInfo}>{ProfileLocales.profilePicture[lang]}</div>
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
                            {/* <span className={styles["avatar-preview-err"]}>{avatarPreviewErr}</span> */}
                        </div>

                        <div className={styles.roomPics}>
                            <label> {ProfileLocales.roomPicturesLabel[lang]}</label>
                            <div className={styles.photosRoomInfo}>{ProfileLocales.roomPictures[lang]}</div>
                            <div className={styles.profileBanner}>
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg, image/jpg"
                                    // onChange={this.handleRoomPhoto}
                                    className={styles["button_room"]}

                                />
                                 <div className={styles.banner}>
                                    Max {lang === "de" ? 'Größe' : 'Size'}: 5MB
                                </div>
                            </div>
                        </div>

                        {messages.length ? <div> <p className={styles["fields-err"]}>{ProfileLocales.errors[lang]}</p> </div> : null}

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

export default connect(mapStateToProps, mapDispatchToProps)(addProfileSenior);
