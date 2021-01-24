import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import roomsLocales from "../locales/locales.rooms.json";

class Berlin extends Component {
  state = {
    rooms: [],
    search: "",
    select: "--",
    maxPrice: 10000,
    searchedRoom: [],
    photos: [], //[urls pointing to the images]
    filter: false,
  };
  //1. from frontend, axios request a room data-> route rooms.js
  async componentDidMount() {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKENDURL}api/rooms`
    );
    this.setState({
      rooms: response.data.rooms,
    });
  }
  searchedName = (event) => {
    this.setState({
      [event.target.name]:
        event.target.type === "select"
          ? event.target.selected
          : event.target.value,
    });
  };

  searchPrice = (event) => {
    this.setState({
      maxPrice: event.target.value,
    });
  };

  searchRequest = (e) => {
    const filteredRoomsBySelect = this.state.rooms.filter((room) => {
      if (this.state.select === "--") {
        return true;
      }
      return room.district === this.state.select;
    });

    const filteredRooms = filteredRoomsBySelect.filter((room) => {
      if (this.state.search === "") {
        return true;
      }
      return room.postcode === parseInt(this.state.search);
    });

    const filteredByPrice = filteredRooms.filter((room) => {
      if (this.state.maxPrice === 10000) {
        return true;
      }
      return parseInt(room.price) <= this.state.maxPrice;
    });

    this.setState({
      filter: true,
      searchedRoom: filteredByPrice,
    });
  };
  render() {
    const lang = localStorage.getItem("lang");

    let display = this.state.filter ? "searchedRoom" : "rooms";
    const room = this.state[display].map((el) => {
      return (
        <div className="room-preview" key={el._id}>
          <Link className="room-preview" to={`/berlin/${el._id}`}>
            <img src={"../../image/icon-home-8.jpg"}></img>
            <div className="room-preview-info-container">
              <h3>{el.name}</h3>
              <p>
                {el.adress} {el.postcode} {el.district}
              </p>
              <p>{el.price} €</p>
            </div>
          </Link>
        </div>
      );
    });
    return (
      <div className="rooms-container" data-testid="berlin-root">
        <h1>
          {roomsLocales.title[lang]} Berlin {this.state.rooms.length}{" "}
          {roomsLocales.offers[lang]}
        </h1>
        <label htmlFor="searchbypostcode">{roomsLocales.search[lang]}: </label>
        <input
          type="search"
          name="search"
          value={this.state.search}
          onChange={this.searchedName}
          placeholder={roomsLocales.placeholder[lang]}
        />
        <label htmlFor="searchbyprice">
          {roomsLocales["max-price"][lang]}:{" "}
        </label>
        <input
          type="search"
          name="search"
          value={this.state.MaxPrice}
          onChange={this.searchPrice}
          placeholder={roomsLocales["max-price"][lang]}
        />
        <label htmlFor="filterbydistrict">{roomsLocales.suburb[lang]}: </label>
        <select
          name="select"
          type="select"
          value={this.state.select}
          onChange={this.searchedName}
          // selected={this.state.select}
        >
          <option value="--">select</option>
          <option value="Charlottenburg-Wilmersdorf">
            Charlottenburg-Wilmersdorf
          </option>
          <option value="Friedrichshain-Kreuzberg">
            Friedrichshain-Kreuzberg
          </option>
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
        <button onClick={this.searchRequest}>Search</button>
        <div className="table-container">{room}</div>
      </div>
    );
  }
}
export default Berlin;
