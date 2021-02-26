import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import "./login.css";
import loginLocales from "../../locales/locales.login.json";
//stlyes
//import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class Login extends Component {
  state = {
    email: "",
    password: "",
    redirect: false,
    message: "",
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post(
      `${process.env.REACT_APP_BACKENDURL}api/auth/login`,
      {
        email: this.state.email,
        password: this.state.password,
      }
    );

    this.props.setUser(response.data);

    this.setState({
      redirect: true,
    });
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
export default Login;
