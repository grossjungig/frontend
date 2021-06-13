import React, { Component } from "react";
import axios from '../../axios';
import './addRoom.css'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import Select from 'react-select'
import addRoomLocales from '../../locales/locales.addroom.json'



class AddRoom extends Component {
  state = {
    name: '',
    roomTitle: '',
    gender: '',
    birthdate: '',
    phoneNumber: '',
    district: '',
    address: '',
    postcode: '',
    description: '',
    expectedHelp: [],
    price: '',
    user: '',
  };

  setFormState = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  setHelp = (event) => {
    this.setState({expectedHelp:event})
  }

  addNewRoom = (event) => {
    event.preventDefault();
    const helps=this.state.expectedHelp;
    const expectedHelps=[];
    for (var i = 0 ;i < helps.length; i++ )
    {
      expectedHelps.push(helps[i].value);
    }
    axios
      .post('api/addRoom' , {
        name: this.state.name,
        roomTitle: this.state.roomTitle,
        gender: this.state.gender,
        birthdate: this.state.birthdate,
        phoneNumber: this.state.phoneNumber,
        district: this.state.district,
        address: this.state.address,
        postcode: this.state.postcode,
        description: this.state.description,
        expectedHelp: expectedHelps,
        price: this.state.price,
        user: this.props.fetchedUser._id,
      })
      .then((response) => {
        const roomId = response.data._id
        this.props.history.push(`/room/${roomId}`)
      })
      .catch((err) => {
        this.setState({
          message: err.response.data.message,
        });
      });
  };

  render() {
    const lang = localStorage.getItem("lang");
    return (
      <div className="div_warning_1_addRoom" >
        <div className="div_warning_2_addRoom" >
        </div>
        <div className="main_div_addRoom" >
          <div className="main_div_2_addRoom">

            <label className="label_room" htmlFor="name">{addRoomLocales.name[lang]}</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.setFormState}
              className="input_room"
            />
            
             <label className="label_room" htmlFor="gender">{addRoomLocales.gender[lang]}</label>
            <select
              name="gender"
              type="select"
              value={this.state.gender}
              onChange={this.setFormState}
              className="select_room"
            >
              <option className="option_room" value="" disabled>{addRoomLocales.select[lang]}</option>
              <option className="option_room" value="male">{addRoomLocales.male[lang]}</option>
              <option className="option_room" value="female">{addRoomLocales.female[lang]}</option>
              <option className="option_room" value="divers">{addRoomLocales.divers[lang]}</option>
            </select> 

            <label className="label_room" htmlFor="birthdate">{addRoomLocales.birthdate[lang]}</label>
            <input
              type="date"
              name="birthdate"
              value={this.state.birthdate}
              onChange={this.setFormState}
              className="input_room"
            /> 

            <label className="label_room" htmlFor="name">{addRoomLocales.roomTitle[lang]}</label>
            <input
              type="text"
              name="roomTitle"
              value={this.state.roomTitle}
              onChange={this.setFormState}
              className="input_room"
            />

            <label className="label_room" htmlFor="expectedHelp" style={{marginBottom:"2vh"}}>{addRoomLocales.expectedHelp[lang]}</label>
            <Select isMulti options={addRoomLocales.options[lang]} onChange={this.setHelp} value={this.state.expectedHelp} />

            <label htmlFor="description" className="label_room" >{addRoomLocales.about[lang]}</label>
            <textarea
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.setFormState}
              maxLength="120"
              rows="3"
              className="textarea_room"
            />


            <label className="label_room" htmlFor="district">{addRoomLocales.district[lang]}</label>
            <select
              name="district"
              type="select"
              value={this.state.district}
              onChange={this.setFormState}
              className="select_room"
            >
              <option value="" disabled> {addRoomLocales.select[lang]} </option>
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

            <label className="label_room" htmlFor="address">{addRoomLocales.address[lang]}</label>
            <input
              type="text"
              name="address"
              value={this.state.address}
              onChange={this.setFormState}
              className="input_room"
            />

            <label className="label_room" htmlFor="postcode">{addRoomLocales.postcode[lang]}</label>
            <input
              type="number"
              name="postcode"
              value={this.state.postcode}
              onChange={this.setFormState}
              className="input_room"
            />

            <label className="label_room" htmlFor="price">{addRoomLocales.price[lang]}</label>
            <input
              type="number"
              name="price"
              value={this.state.price}
              onChange={this.setFormState}
              className="input_room"
            />

            <label className="label_room" htmlFor="phoneNumber">{addRoomLocales.phoneNumber[lang]}</label>
            <input
              type="tel"
              name="phoneNumber"
              value={this.state.phoneNumber}
              onChange={this.setFormState}
              className="input_room"
            />


            <label className="label_room" >{addRoomLocales.picture[lang]}</label>
            <button type="submit" className="button_room">{addRoomLocales.uploadPicture[lang]}</button>

            <div className="div_button_addRoom">
            <Link to={'/userportal'}>
              <button type="submit" className="button_room button_room_cancel" >{addRoomLocales.cancel[lang]}</button>
            </Link>
              <button type="submit" className="button_room button_room_submit" onClick={this.addNewRoom} >{addRoomLocales.submit[lang]}   </button>
            </div>
         
          </div>
        </div>
      </div>
     
   
    );
  }
}

const mapStateToProps = (reduxState) => ({
  fetchedUser: reduxState.user
});

export default connect(mapStateToProps)(AddRoom);
