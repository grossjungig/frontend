import React, { Component } from "react";
// import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import "./login.css";
import { fullBlock } from '../../shared/index.module.css';
import loginLocales from "../../locales/locales.login.json";
import TextField from "@material-ui/core/TextField";
import { connect } from 'react-redux';
import { dispatchLogin } from '../../store/auth/thunks';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  handleSubmit = (event) => {
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
    if (this.props.isAuthenticated) {
      return <Redirect to="/userportal" />;
    }
    return (
      <div className={fullBlock}>
        <div className="login">
          <div className="welcome-header">
          <h2>{loginLocales.welcome[lang]}</h2>
          <h3>{loginLocales.prompt[lang]}</h3></div>
          <div className="link-container">
          <p className="sign-in-up-link">{loginLocales.doNotHave[lang]} <Link to="/signup">{loginLocales.signUp[lang]}</Link></p></div>
          <form className="login-styles" onSubmit={this.handleSubmit}>
            <TextField
              margin="normal"
              label={loginLocales.email[lang]}
              fullWidth
              variant="outlined"
              type="email"
              name="email"
              id="email"
              value={this.state.email}
              onChange={this.setFormState}
            />
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
              {loginLocales.forgot[lang] + ' '}
              <Link to="/forgotPassword" style={{ textDecoration: "none" }}>
                {loginLocales.click[lang]}
              </Link>
            </h5>
            <button className="blue-button">
              {loginLocales.login[lang]}
            </button>
          </form>

          {this.props.errMsg && <p className="warning">{this.props.errMsg}</p>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return {
    isAuthenticated: !!reduxState.token,
    errMsg: reduxState.errMsg,
  };
};

const mapDispatchToProps = {
  login: (email, pwd) => dispatchLogin(email, pwd)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
