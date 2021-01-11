import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "../styled";
import resetLocales from "../../locales/locales.resetpassword.json";

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
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { token },
      },
    } = this.props;
    try {
      const response = await axios.get("http://localhost:3000/reset", {
        params: {
          resetPasswordToken: token,
        },
      });
      // console.log(response);
      if (response.data.message === "password reset link a-ok") {
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
        "http://localhost:3000/updatePasswordViaEmail",
        {
          email,
          password,
          resetPasswordToken: token,
        }
      );
      console.log(response.data);
      if (response.data.message === "password updated") {
        this.setState({
          updated: true,
          error: false,
        });
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
    const { password, error, isLoading, updated } = this.state;
    const lang = localStorage.getItem("lang");
    if (error) {
      return (
        <div>
          <div style={loading}>
            <h4>Problem resetting password. Please send another reset link.</h4>
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
      <div className="full-block">
        <div className="side-view">
          <img src="../image/signup.png" alt="login-side-view" />
        </div>
        <form className="password-form" onSubmit={this.updatePassword}>
          <input
            id="password"
            label="password"
            onChange={this.handleChange("password")}
            value={password}
            type="password"
          />
          <button type="submit" label={resetLocales.update[lang]}></button>
        </form>

        {updated && (
          <div>
            <p>
              Your password has been successfully reset, please try logging in
              again.
            </p>
            <Link>
              <Button label={resetLocales.login[lang]}></Button>
            </Link>
          </div>
        )}
        <Link>
          <Button label={resetLocales.return[lang]}></Button>
        </Link>
      </div>
    );
  }
}
