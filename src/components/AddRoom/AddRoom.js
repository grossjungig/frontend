import React, { Component } from "react";
import axios from '../../axios';
import './addRoom.css'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import Select from 'react-select'

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
        this.props.history.push(`/berlin/${roomId}`)
      })
      .catch((err) => {
        this.setState({
          message: err.response.data.message,
        });
      });
  };

  render() {
    return (
      <div className="div_warning_1_addRoom" >
        <div className="div_warning_2_addRoom" >
        </div>
        <div className="main_div_addRoom" >
          <div className="main_div_2_addRoom">

            <label className="label_room" htmlFor="name">First Name</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.setFormState}
              className="input_room"
            />
            
             <label className="label_room" htmlFor="gender">Gender</label>
            <select
              name="gender"
              type="select"
              value={this.state.gender}
              onChange={this.setFormState}
              className="select_room"
            >
              <option className="option_room" value="" disabled>Select</option>
              <option className="option_room" value="male">Male</option>
              <option className="option_room" value="female">Female</option>
              <option className="option_room" value="divers">Divers</option>
            </select> 

            <label className="label_room" htmlFor="age">Birthdate</label>
            <input
              type="date"
              name="birthdate"
              value={this.state.age}
              onChange={this.setFormState}
              className="input_room"
            /> 

            <label className="label_room" htmlFor="name">Room Title</label>
            <input
              type="text"
              name="roomTitle"
              value={this.state.roomTitle}
              onChange={this.setFormState}
              className="input_room"
            />

            <label className="label_room" htmlFor="expectedHelp" style={{marginBottom:"2vh"}}>Expected Help</label>
            <Select isMulti options={options} onChange={this.setHelp} value={this.state.expectedHelp} />

            <label htmlFor="description" className="label_room" >About me (max 120 signs)</label>
            <textarea
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.setFormState}
              maxLength="120"
              rows="3"
              className="textarea_room"
            />


            <label className="label_room" htmlFor="district">District</label>
            <select
              name="district"
              type="select"
              value={this.state.district}
              onChange={this.setFormState}
              className="select_room"
            >
              <option value="" disabled> Select </option>
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

            <label className="label_room" htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              value={this.state.address}
              onChange={this.setFormState}
              className="input_room"
            />

            <label className="label_room" htmlFor="postcode">Postcode</label>
            <input
              type="number"
              name="postcode"
              value={this.state.postcode}
              onChange={this.setFormState}
              className="input_room"
            />

            <label className="label_room" htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              value={this.state.price}
              onChange={this.setFormState}
              className="input_room"
            />

            <label className="label_room" htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={this.state.phoneNumber}
              onChange={this.setFormState}
              className="input_room"
            />


            <label className="label_room" >Picture</label>
            <button type="submit" className="button_room">Upload the picture</button>

            <div className="div_button_addRoom">
            <Link to={'/userportal'}>
              <button type="submit" className="button_room button_room_cancel" >Cancel</button>
            </Link>
              <button type="submit" className="button_room button_room_submit" onClick={this.addNewRoom} >Submit</button>
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
