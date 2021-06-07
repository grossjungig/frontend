import React, {Component} from "react";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from '@material-ui/core/ListSubheader'
import styles from "./hero.module.css"
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
      return `/berlin?${new URLSearchParams(this.state.filters).toString()}`;
    }
    const dropdownItems = berlinDistricts.map((district, index) => {
        return <MenuItem key={index} value={district}>
          {district}
        </MenuItem>
      }
    )
    return (
      <div className={styles.main}>
        <div style={{backgroundImage: `url(${heroBanner})`}} className={styles.background}>
          <div className={styles.formContainer}>
            <div className={styles.header}>
              <h1>{homeLocales.find[lang]}</h1>
            </div>
            <div className={styles.form}>
              <div className={`${styles.tabs} ${styles.formGroup}`}>
                <Button onClick={() => this.switchTab('rooms')}
                        className={`${styles.btn} ${styles.btnSelected} ${styles.tab}`}>
                  {homeLocales.offers[lang]}
                </Button>
                <Link to={"/people"} className={styles.btn}>
                  <Button className={`${styles.btn} ${styles.tab}`}>
                    {homeLocales.requests[lang]}
                  </Button>
                </Link>
              </div>
              <div className={styles.dropdowns}>
                <FormControl variant={"outlined"} className={styles.formGroup}>
                  <Select
                    name="city"
                    id="city-select"
                    className={styles.dropdown}
                    classes={{
                      root: styles.MuiSelectRoot,
                      outlined: styles.MuiSelectOutlined,
                      select: styles.MuiSelect
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
                <FormControl variant={"outlined"} className={styles.formGroup}>
                  <Select
                    name="district"
                    id="district-select"
                    className={styles.dropdown}
                    classes={{
                      root: styles.MuiSelectRoot,
                      outlined: styles.MuiSelectOutlined,
                      select: styles.MuiSelect
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
              <Link to={this.state.tab === 'rooms' ? roomsLink : '/people'}>
                <Button className={`${styles.btn} ${styles.submit}`}>
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