import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../../pages/login/login.css";
import styles from './signup.module.css';
import { fullBlock } from '../../shared/index.module.css';
import axios from '../../axios';
import signupLocales from "../../locales/locales.signup.json";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from '@material-ui/core/CircularProgress';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from "react-router-dom";


class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    pwdConfirm: "",
    role: "senior",
    messages: [],
    checked:false,
    isLoading: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const lang = localStorage.getItem("lang");
    axios
      .post('api/auth/signup', {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        pwdConfirm: this.state.pwdConfirm,
        role: this.state.role,
      })
      .then((response) => {
        this.setState({ isLoading: false });
        if (response.data.message === 'User created') {
          this.props.history.push('/login');
          alert(signupLocales.success_msg[lang]);
        }
      })
      .catch((err) => {
        this.setState({ isLoading: false });
        this.setState({ messages: err.response.data.data });
      });
  };

  setFormState = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleCheck = (event) =>{
    this.setState({
      checked: event.target.checked
    })
   
  }

  onChange = (event) => {
    this.setState({ role: event.target.value });
  };

  render() {
    console.log('state', this.state.checked)
    const lang = localStorage.getItem("lang");

    let errorMessages = <p>Hello World</p>;
    if (this.state.messages) {
      errorMessages = <ul className={styles["signup-errs"]}>{
        this.state.messages.map((msg, i) => <li key={i}>{signupLocales.errors[msg][lang]}</li>)
      }</ul>
    }

    return (
      <div className={fullBlock}>
        <div className="x"></div>
        <div className="login">
          <div className="welcome-header">
          <h2>{signupLocales.welcome[lang]}</h2>{" "}
          <h3>{signupLocales.title[lang]}</h3></div>
          <div className="link-container">
          <p className="sign-in-up-link">{signupLocales.alreadyHave[lang]} <Link to="/login">{signupLocales.login[lang]}</Link></p></div>
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
              error={this.state.messages.includes('INVALID_NAME')}
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
              error={
                this.state.messages.includes('INVALID_EMAIL') ||
                this.state.messages.includes('EMAIL_ALREADY_EXISTS')
              }
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
              type="password"
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
            <div className={styles["privacy-container"]}>
            <Checkbox 
            color="primary"
            checked={this.state.checked}
            onChange={this.handleCheck}
            />
            <label className={styles["privacy-label"]}>{signupLocales.joining[lang]} <Link to='/termsandconditions'>{signupLocales.privacy_policy[lang]}</Link></label>
            </div>
            <button disabled={!this.state.checked ? true: false} onClick={this.handleSubmit} className={styles["blue-button"]}>
            {
              this.state.isLoading ?
              <CircularProgress className={styles.progress} size={30} /> :
              signupLocales.submit[lang]
            }
          </button>
          </form>
          {errorMessages}
        </div>
      </div>
    );
  }
}

export default withRouter(Signup);
