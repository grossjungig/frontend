import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import roomsLocales from "../locales/locales.rooms.json";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

class Berlin extends Component {
  state = {
    rooms: [],
    search: "",
    select: "--",
    maxPrice: "",
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
      if (this.state.maxPrice === "") {
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
        <Link to={`/berlin/${el._id}`} key={el._id}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="card_people">
              <div className="card_img">
                <img
                  style={{
                    float: "right",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  src={
                    el.images.length >= 1
                      ? el.images[0]["secureUrl"]
                      : "../../image/icon-home-9.jpg"
                  }
                  alt="room placeholder"
                ></img>{" "}
              </div>

              <div className="container_people">
                <h3>{el.name}</h3>
                <p>
                  {el.adress} {el.postcode} {el.district}
                </p>
                <p>{el.price} €</p>
              </div>
            </div>
          </div>
        </Link>
      );
    });
    return (
      <div className="tables-x" data-testid="berlin-root">
        <div className="offers-title">
          <h1>
            {roomsLocales.title[lang]} Berlin {this.state.rooms.length}{" "}
            {roomsLocales.offers[lang]}
          </h1>
        </div>

        <div className="search-block">
          <div className="search-form">
            {" "}
            <div className="form-grid">
              <div className="suburb">
                <div className="offers-input-labels">
                  {" "}
                  <label
                    className="offers-input-labels"
                    htmlFor="filterbydistrict"
                  >
                    {roomsLocales.suburb[lang]}:{" "}
                  </label>
                </div>
                <div>
                  <FormControl
                    size="small"
                    variant="outlined"
                    style={{ width: "100%" }}
                  >
                    <Select
                      fullWidth
                      name="select"
                      type="select"
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={this.state.select}
                      onChange={this.searchedName}
                    >
                      <MenuItem value="--">
                        <em>{roomsLocales.search_district[lang]}</em>
                      </MenuItem>
                      <MenuItem value="Charlottenburg-Wilmersdorf">
                        Charlottenburg-Wilmersdorf
                      </MenuItem>
                      <MenuItem value="Friedrichshain-Kreuzberg">
                        Friedrichshain-Kreuzberg
                      </MenuItem>
                      <MenuItem value="Lichtenberg">Lichtenberg</MenuItem>
                      <MenuItem value="Marzahn-Hellersdorf">
                        Marzahn-Hellersdorf
                      </MenuItem>
                      <MenuItem value="Mitte">Mitte</MenuItem>
                      <MenuItem value="Neukoelln">Neukoelln</MenuItem>
                      <MenuItem value="Pankow">Pankow</MenuItem>
                      <MenuItem value="Reinickendorf">Reinickendorf</MenuItem>
                      <MenuItem value="Spandau">Spandau</MenuItem>
                      <MenuItem value="Steglitz-Zehlendorf">
                        Steglitz-Zehlendorf
                      </MenuItem>
                      <MenuItem value="Tempelhof-Schoeneberg">
                        Tempelhof-Schoeneberg
                      </MenuItem>
                      <MenuItem value="Treptow-Koepenick">
                        Treptow-Koepenick
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>{" "}
              </div>
              <div className="postcode">
                <div className="offers-input-labels">
                  {" "}
                  <label
                    className="offers-input-labels"
                    htmlFor="filterbypostcode"
                  >
                    {roomsLocales.search[lang]}:{" "}
                  </label>
                </div>
                <TextField
                  size="small"
                  fullWidth
                  id="outlined-search"
                  name="search"
                  value={this.state.search}
                  onChange={this.searchedName}
                  // label={roomsLocales.search[lang]}
                  type="search"
                  variant="outlined"
                />
              </div>

              <div className="price">
                <div className="offers-input-labels">
                  <label htmlFor="searchbyprice">
                    {roomsLocales["max-price"][lang]}:{" "}
                  </label>
                </div>
                <div>
                  {" "}
                  <TextField
                    size="small"
                    fullWidth
                    id="outlined-search"
                    name="search"
                    // label={roomsLocales["max-price"][lang]}
                    type="search"
                    variant="outlined"
                    type="search"
                    value={this.state.MaxPrice}
                    onChange={this.searchPrice}
                  />
                </div>
              </div>
            </div>{" "}
            <Button
              style={{
                color: "white",
                backgroundColor: "#365da7",
                marginTop: "10px",
              }}
              variant="contained"
              onClick={this.searchRequest}
            >
              Search
            </Button>{" "}
          </div>
        </div>

        <div className="table-container">{room}</div>
      </div>
    );
  }
}
export default Berlin;
