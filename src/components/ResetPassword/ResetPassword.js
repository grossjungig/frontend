import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from '../../axios';
import Button from "@material-ui/core/Button";
import resetLocales from "../../locales/locales.resetpassword.json";

import { fullBlock } from '../../shared/index.module.css';
import styles from './index.module.css';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';

const loading = {
  margin: "1em",
  fontSize: "24px",
};

export default class ResetPassword extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      updated: false,
      isLoading: true,
      error: false,
      inputType: "password",
      showPassword:false
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { token },
      },
    } = this.props;
    try {
      const response = await axios.get('resetPassword/reset', {
        params: { resetPasswordToken: token } });

      if (response.data) {
        this.setState({
          username: response.data.username,
          updated: false,
          isLoading: false,
          error: false,
        });
      }
    } catch (error) {
      console.log(error.response.data);
      this.setState({
        updated: false,
        isLoading: false,
        error: true,
      });
    }
  }

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleTogglePassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    })
  }

  updatePassword = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const {
      match: {
        params: { token },
      },
    } = this.props;
    try {
      const response = await axios.put(
        'updatePassword/updatePasswordViaEmail',
        {
          email,
          password,
          resetPasswordToken: token,
        }
      );

      if (response.data.message === "password updated") {
        alert('Password updated');
        this.props.history.push('/login')
      } else {
        this.setState({
          updated: false,
          error: true,
        });
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  render() {
    const { password, error, isLoading } = this.state;
    const lang = localStorage.getItem("lang");
    if (error) {
      return (
        <div>
          <div style={loading}>
            <h4>{resetLocales.problem[lang]}</h4>
            <Link to="/">
              <Button label={resetLocales.return[lang]}></Button>
            </Link>

            <Link to="/forgotPassword">
              <Button label={resetLocales.forgot[lang]}></Button>
            </Link>
          </div>
        </div>
      );
    }
    if (isLoading) {
      return (
        <div>
          <div style={loading}>Loading User Data...</div>
        </div>
      );
    }
    return (
      <div className={fullBlock}>
        <form className={styles.form} onSubmit={this.updatePassword}>
          <div className={styles.formCtrl}>
            <input
              className={styles.pwdInput}
              label="password"
              onChange={this.handleChange("password")}
              value={password}
              type={this.state.showPassword ? "text" : "password"}
              placeholder="Enter a new password"
            />
            <IconButton
              className={styles.showIcon}
              aria-label="toggle password visibility"
              onClick={this.handleTogglePassword}
            >
            {this.state.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </div>
          <Button 
            type="submit"
            className={styles.submitBtn}
          >
            {resetLocales.update[lang]}
          </Button>
        </form>
      </div>
    );
  }
}
