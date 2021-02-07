import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// import "./signup.css";
import "../login/login.css";
import axios from "axios";
import signupLocales from "../../locales/locales.signup.json";
//stlyes
//import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    role: "senior",
    redirect: false,
    message: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`${process.env.REACT_APP_BACKENDURL}api/auth/signup`, {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        role: this.state.role,
      })
      .then((response) => {
        console.log("RSPONSE", response);
        this.props.setUser(response.data);
        this.props.history.push("/userportal");
      })
      .catch((err) => {
        this.setState({
          message: err.response.data.message,
        });
      });
  };

  setFormState = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onChange = (event) => {
    this.setState({ role: event.target.value });
  };

  render() {
    const lang = localStorage.getItem("lang");

    if (this.state.redirect) {
      return <Redirect to="/userportal" />;
    }
    return (
      <div className="full-block">
        <div className="x">
          {/* <img src="../image/signup.png" alt="singup-side-view" /> */}
        </div>
        <div className="login">
          <h2>{signupLocales.welcome[lang]}</h2>{" "}
          {/* <h1>{signupLocales.grossjungig[lang]}</h1> */}
          <h3>{signupLocales.title[lang]}</h3>
          {/* <div className="signup-container"> */}
          <form className="login-styles" noValidate autoComplete="off">
            {/* <label htmlFor="name">Name</label> */}
            <TextField
              margin="normal"
              label="Name"
              fullWidth
              variant="outlined"
              name="name"
              id="name"
              value={this.state.name}
              onChange={this.setFormState}
              type="text"
            />
            {/* <label htmlFor="email">{signupLocales.email[lang]}</label> */}
            <TextField
              margin="normal"
              fullWidth
              label={signupLocales.email[lang]}
              variant="outlined"
              name="email"
              id="email"
              type="text"
              value={this.state.email}
              onChange={this.setFormState}
            />
            {/* <label htmlFor="password">{signupLocales.password[lang]}</label> */}
            <TextField
              margin="normal"
              fullWidth
              label={signupLocales.password[lang]}
              variant="outlined"
              type="password"
              name="password"
              id="password"
              value={this.state.password}
              onChange={this.setFormState}
            />
            <InputLabel id="role-select" htmlFor="role">
              {signupLocales.role[lang]}
            </InputLabel>

            <Select
              name="role"
              id="role"
              value={this.state.role}
              onChange={this.onChange}
            >
              <MenuItem value={"senior"}>{signupLocales.senior[lang]}</MenuItem>
              <MenuItem value={"youth"}>{signupLocales.youth[lang]}</MenuItem>
            </Select>
            <br />
            <Button
              variant="contained"
              onClick={this.handleSubmit}
              type="submit"
            >
              {signupLocales.submit[lang]}
            </Button>
          </form>
          {/* </div> */}
          <p className="warning">
            {" "}
            {this.state.message && <p>{this.state.message}</p>}
          </p>
        </div>
      </div>
    );
  }
}

export default Signup;
