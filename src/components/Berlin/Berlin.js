import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from '../../axios';
import roomsLocales from "../../locales/locales.rooms.json";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import styles from './index.module.css';

class Berlin extends Component {
  state = {
    allRooms: [],
    filteredRooms: [],
    photos: [],
    filtered: false,
    filters: {
      district: '',
      postcode: '',
      price: ""
    }
  };

  async componentDidMount() {
    const response = await axios.get(
      `api/rooms`
    );
    this.setState({
      allRooms: response.data.rooms,
    });
    let url = window.location.toString()
    let district = new URLSearchParams(url.slice(url.indexOf('?') + 1)).get('district');
    if (district) {
      let data = {
        target : {
          name: 'district',
          value: district
        }
      }
      this.setFilter(data);
      this.filterRooms()
    }
  }

  setFilter = (event) => {
    const filters = {...this.state.filters};
    filters[event.target.name] = event.target.value
    this.setState({
      filtered: true,
      filters: filters
    });
  }

  filterRooms = (e) => {
    let filteredRooms = this.state.allRooms
    let filtered = false

    for (const [key, value] of Object.entries(this.state.filters)) {
      if (value) {
        filtered = true
        filteredRooms = filteredRooms.filter((room) => {
          // eslint-disable-next-line
          return room[key] == this.state.filters[key];
        });
      }
    }

    this.setState({
      filter: filtered,
      filteredRooms: filteredRooms,
    });
  };

  render() {
    const lang = localStorage.getItem("lang");
    let display = this.state.filtered ? "filteredRooms" : "allRooms";
    const room = this.state[display].map((el) => {
      return (
        <Link to={`/berlin/${el._id}`} key={el._id}>
          <div style={{display: "flex", justifyContent: "center"}}>
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
                />{" "}
              </div>

              <div className="container_people">
                <h3>{el.roomTitle}</h3>
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
      <div className="tables-x">
        <div className={styles.offersTitle}>
          <h1>
            {roomsLocales.title[lang]} Berlin {this.state.allRooms.length}{" "}
            {roomsLocales.offers[lang]}
          </h1>
        </div>

        <div className={styles.searchBlock}>
          <div className={styles.searchForm}>
            {" "}
            <div>
              <div>
                <div className={styles.offerInputLabels}>
                  {" "}
                  <label
                    className={styles.offerInputLabels}
                    htmlFor="filterbydistrict"
                  >
                    {roomsLocales.suburb[lang]}:{" "}
                  </label>
                </div>
                <div>
                  <FormControl variant="outlined" style={{width: "100%"}}>
                    <Select
                      fullWidth
                      name="district"
                      type="select"
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={this.state.filters.district ?? ''}
                      onChange={this.setFilter}
                    >
                      <MenuItem value=''>
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
                </div>
                <div className={styles.offerInputLabels}>
                  {" "}
                  <label
                    className={styles.offerInputLabels}
                    htmlFor="filterbypostcode"
                  >
                    {roomsLocales.search[lang]}:{" "}
                  </label>
                </div>
                <TextField
                  fullWidth
                  id="outlined-search"
                  name="postcode"
                  value={this.state.filters.postcode}
                  onChange={this.setFilter}
                  type="search"
                  variant="outlined"
                />
              </div>

              <div>
                <div className={styles.offerInputLabels}>
                  <label htmlFor="searchbyprice">
                    {roomsLocales["max-price"][lang]}:{" "}
                  </label>
                </div>
                <div>
                  {" "}
                  <TextField
                    fullWidth
                    id="outlined-search"
                    name="price"
                    type="search"
                    variant="outlined"
                    value={this.state.filters.price}
                    onChange={this.setFilter}
                  />
                </div>
              </div>
            </div>
            {" "}
            <Button
              style={{
                color: "white",
                backgroundColor: "#365da7",
                marginTop: "10px",
              }}
              variant="contained"
              onClick={this.filterRooms}
            >
              Search
            </Button>{" "}
          </div>
        </div>

        <div className={styles.tableContainer}>{room}</div>
      </div>
    );
  }
}

export default Berlin;
