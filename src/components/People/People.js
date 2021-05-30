import React, {Component} from "react";
import axios from '../../axios';
import dummyAvatar from '../../assets/images/dummy-avatar.jpg';
import {berlinDistricts, capitalizeFirstLetter} from '../../utils';
import './index.css'
import MenuItem from "@material-ui/core/MenuItem";
import styles from "../Rooms/index.module.css";
import roomsLocales from "../../locales/locales.rooms.json";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default class People extends Component {
  constructor(props) {
    super(props);
    this.setFilter = this.setFilter.bind(this);
    this.filterPeople = this.filterPeople.bind(this);
  }

  state = {
    allPeople: [],
    filteredPeople: [],
    filtered: false,
    filters: {
      district: '',
      price: ""
    }
  };

  async componentDidMount() {
    const response = await axios.get('api/profiles');

    this.setState({
      allPeople: response.data.profiles,
    });

    let url = window.location.toString()
    let district = new URLSearchParams(url.slice(url.indexOf('?') + 1)).get('district');
    if (district) {
      let data = {
        target: {
          name: 'district',
          value: district
        }
      }
      this.setFilter(data);
      this.filterPeople()
    }
  }

  setFilter(event) {
    const filters = {...this.state.filters};
    filters[event.target.name] = event.target.value
    this.setState({
      filtered: true,
      filters: filters
    });
  }

  filterPeople(e) {
    let filteredPeople = this.state.allPeople
    let filtered = false

    for (const [key, value] of Object.entries(this.state.filters)) {
      if (value) {
        filtered = true
        filteredPeople = filteredPeople.filter((person) => {
          if (key === 'price') {
            return person.price <= this.state.filters.price
          } else {
            // has to work with numbers and strings
            // eslint-disable-next-line
            return person[key] === this.state.filters[key];
          }
        });
      }
    }
    this.setState({
      filter: filtered,
      filteredPeople: filteredPeople,
    });
  };

  handleClick(_id) {
    this.props.history.push(`/profile/${_id}`);
  }

  render() {
    const lang = localStorage.getItem("lang");

    let display = this.state.filtered ? "filteredPeople" : "allPeople";

    const dropdownItems = berlinDistricts.map((district, index) => {
        return <MenuItem key={index} value={district}>
          {district}
        </MenuItem>
      }
    )
    return (
      <div className="tables-x">
        <div className={styles.offersTitle}>
          <h1>
            {roomsLocales.title[lang]} Berlin {this.state.allPeople.length}{" "}
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
                      id="district-select"
                      value={this.state.filters.district ?? ''}
                      onChange={this.setFilter}
                      displayEmpty
                      IconComponent={ExpandMoreIcon}
                    >
                      <MenuItem value="">
                        {roomsLocales.search_district[lang]}
                      </MenuItem>
                      {dropdownItems}
                    </Select>
                  </FormControl>
                </div>
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
              onClick={this.filterPeople}
            >
              Search
            </Button>{" "}
          </div>
        </div>

        <ul className="profile-card-container">
          {this.state[display].map((profile) => {
            return (
              <li
                className="profile-card"
                onClick={() => this.handleClick(profile._id)}
                key={profile._id}
              >
                <div className="profile-card__avatar">
                  <img src={profile.avatarUrl || dummyAvatar} alt="person"/>
                </div>
                <div>
                  <h3>{capitalizeFirstLetter(profile.name)}, {profile.age}</h3>
                  <div>
                    <span className="profile-card__item">would live in:</span>
                    {profile.district}
                  </div>
                  <p>
                    <span className="profile-card__item">can pay around:</span>
                    {profile.price}€ (monthly)
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
