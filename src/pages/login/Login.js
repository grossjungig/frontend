import React, { Component } from "react";
// import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import "./login.css";
import loginLocales from "../../locales/locales.login.json";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { connect } from 'react-redux';
import { dispatchLogin } from '../../store/auth/thunks';

class Login extends Component {
  state = {
    email: "",
    password: "",
    redirect: false,
    message: "",
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.login(email, password);
  };

  setFormState = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const lang = localStorage.getItem("lang");
    // TODO: local should be injected using the context api, reading localStorage is expensive
    if (this.state.redirect) {
      return <Redirect to="/userportal" />;
    }
    return (
      <div className="full-block">
        <div className="login">
          <h2>{loginLocales.welcome[lang]}</h2>
          <h3>{loginLocales.prompt[lang]}</h3>

          <form className="login-styles" onSubmit={this.handleSubmit}>
            {/* <label htmlFor="email">{loginLocales.email[lang]}</label> */}
            <TextField
              margin="normal"
              label={loginLocales.email[lang]}
              fullWidth
              variant="outlined"
              type="text"
              name="email"
              id="email"
              value={this.state.email}
              onChange={this.setFormState}
            />
            {/* <label htmlFor="password">{loginLocales.password[lang]}</label> */}
            <TextField
              margin="normal"
              fullWidth
              label={loginLocales.password[lang]}
              variant="outlined"
              type="password"
              name="password"
              id="password"
              value={this.state.password}
              onChange={this.setFormState}
            />
            <h5>
              {loginLocales.forgot[lang]}{" "}
              <Link to="/forgotPassword" style={{ textDecoration: "none" }}>
                {loginLocales.click[lang]}
              </Link>
            </h5>
            <Button
              style={{
                backgroundColor: "#365da7",
                color: "white",
              }}
              variant="contained"
              id="login-submit-button"
              type="submit"
            >
              {loginLocales.login[lang]}
            </Button>
          </form>

          {this.state.message && <p>{this.state.message}</p>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return {
    // x: reduxState.x
  };
};

const mapDispatchToProps = {
  login: (email, pwd) => dispatchLogin(email, pwd)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
