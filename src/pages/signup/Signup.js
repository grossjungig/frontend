import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../../pages/login/login.css";
import './signup.css';
import axios from '../../axios';
import signupLocales from "../../locales/locales.signup.json";
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
    pwdConfirm: "",
    role: "senior",
    messages: [],
  };

  handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('api/auth/signup', {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        pwdConfirm: this.state.pwdConfirm,
        role: this.state.role,
      })
      .then((response) => {
        if (response.data.message === 'User created') {
          this.props.history.push('/login');
          alert('Your account has been created. You can now log in!');
        }
      })
      .catch((err) => {
        this.setState({ messages: err.response.data.data });
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

    let errorMessages = <p>Hello World</p>;
    if (this.state.messages) {
      errorMessages = <ul className="signup-errs">{
        this.state.messages.map((msg, i) => <li key={i}>{signupLocales.errors[msg][lang]}</li>)
      }</ul>
    }

    return (
      <div className="full-block">
        <div className="x"></div>
        <div className="login">
          <h2>{signupLocales.welcome[lang]}</h2>{" "}
          <h3>{signupLocales.title[lang]}</h3>
          <form className="login-styles" noValidate autoComplete="off">
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
              error={this.state.messages.includes('INVALID_EMAIL')}
            />
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
              error={
                this.state.messages.includes('PWD_TOO_SHORT') ||
                this.state.messages.includes('PWD_NOT_MATCH')
              }
            />
            <TextField
              margin="normal"
              fullWidth
              label={signupLocales.pwdConfirm[lang]}
              variant="outlined"
              type="pwdConfirm"
              name="pwdConfirm"
              id="pwdConfirm"
              value={this.state.pwdConfirm}
              onChange={this.setFormState}
              error={this.state.messages.includes('PWD_NOT_CONFIRMED')}
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
              style={{
                backgroundColor: "#365da7",
                color: "white",
              }}
              variant="contained"
              onClick={this.handleSubmit}
              type="submit"
            >
              {signupLocales.submit[lang]}
            </Button>
          </form>
          {errorMessages}
        </div>
      </div>
    );
  }
}

export default withRouter(Signup);
