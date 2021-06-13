import React, {Component} from "react";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from '@material-ui/core/ListSubheader'
import "./hero.scss"
import homeLocales from "../../../../locales/locales.home.json";
import heroBanner from "../../../../assets/images/backgrounds/hero-home-background-picture.jpg";
import roomsLocales from "../../../../locales/locales.rooms.json";
import {berlinDistricts} from "../../../../utils";

class Hero extends Component {
  constructor(props) {
    super(props);
    this.setFilter = this.setFilter.bind(this);
  }

  state = {
    tab: 'rooms',
    filters: {
      district: "",
      city: ""
    }
  }

  switchTab(tab) {
    this.setState({
      tab: tab,
    })
  }

  setFilter(event) {
    const filters = {...this.state.filters};
    filters[event.target.name] = event.target.value
    this.setState({
      filtered: true,
      filters: filters
    });
  }

  render() {
    const lang = localStorage.getItem("lang");
    const roomsLink = () => {
      return `/rooms?${new URLSearchParams(this.state.filters).toString()}`;
    }
    const peopleLink = () => {
      return `/people?${new URLSearchParams(this.state.filters).toString()}`;
    }
    const dropdownItems = berlinDistricts.map((district, index) => {
        return <MenuItem key={index} value={district}>
          {district}
        </MenuItem>
      }
    )
    return (
      <div id="hero-home" className={"main"}>
        <div style={{backgroundImage: `url(${heroBanner})`}} className={"background"}>
          <div className={"formContainer"}>
            <div className={"header"}>
              <h1>{homeLocales.find[lang]}</h1>
            </div>

            <div className={"form"}>
              <div className={"tabs formGroup"}>
                <Button onClick={() => this.switchTab('rooms')}
                        className={`btn tab ${this.state.tab === 'rooms' ? 'btnSelected' : ''}`}>
                  {homeLocales.offers[lang]}
                </Button>
                <Button onClick={() => this.switchTab('people')}
                        className={`btn tab ${this.state.tab === 'people' ? 'btnSelected' : ''}`}>
                  {homeLocales.requests[lang]}
                </Button>
              </div>
              <div className={"dropdowns"}>
                <FormControl variant={"outlined"} className={"formGroup"}>
                  <Select
                    name="city"
                    id="city-select"
                    className={"dropdown"}
                    classes={{
                      root: "MuiSelectRoot",
                      outlined: "MuiSelectOutlined",
                      select: "MuiSelect"
                    }}
                    displayEmpty
                    IconComponent={ExpandMoreIcon}
                    value={this.state.filters.city ?? ''}
                    onChange={this.setFilter}
                  >
                    <MenuItem value="">
                      {homeLocales.city[lang]}
                    </MenuItem>
                    <MenuItem value="Berlin">
                      Berlin
                    </MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant={"outlined"} className={"formGroup"}>
                  <Select
                    name="district"
                    id="district-select"
                    className={"dropdown"}
                    classes={{
                      root: "MuiSelectRoot",
                      outlined: "MuiSelectOutlined",
                      select: "MuiSelect"
                    }}
                    displayEmpty
                    IconComponent={ExpandMoreIcon}
                    value={this.state.filters.district ?? ''}
                    onChange={this.setFilter}
                  >
                    <MenuItem value="">
                      {roomsLocales.search_district[lang]}
                    </MenuItem>
                    {this.state.filters.city === '' &&
                    <ListSubheader>Berlin</ListSubheader>
                    }
                    {dropdownItems}
                  </Select>
                </FormControl>
              </div>
              <Link to={this.state.tab === 'rooms' ? roomsLink : peopleLink}>
                <Button className={"btn submit"}>
                  {homeLocales.search[lang]}</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Hero;