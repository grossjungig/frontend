import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import loginLocales from '../../locales/locales.login.json';
import '../../pages/login/login.css';
import forgotLocales from '../../locales/locales.forgotpassword.json';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

/*const title = {
  pageTitle: "Forgot Password Screen",
};*/

class ForgotPassword extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            showError: false,
            isEmailSent: false,
        };
    }

  handleChange = (name) => (event) => {
      this.setState({
          [name]: event.target.value,
      });
  };

  sendEmail = async (e) => {
      e.preventDefault();
      if (this.state.email === '') {
          this.setState({
              showError: true,
              errorMessage: 'Email can not be empty',
          });
      } else {
          console.log(this.state.email);
          const response = await axios.post(
              `${process.env.REACT_APP_BACKENDURL}api/auth/forgotPassword`,
              {
                  email: this.state.email,
              }
          );

          console.log(response.data, 'data');

          if (!response.data.success) {
              // an error has occured
              this.setState({
                  showError: true,
                  isEmailSent: false,
                  errorMessage: 'An error has ocurred.',
              });
          } else if (response.data.success) {
              this.setState({
                  showError: false,
                  isEmailSent: true,
              });
          }
      }
  };

  render() {
      const { email, isEmailSent, showError, errorMessage } = this.state;
      const lang = localStorage.getItem('lang');
      return (
          <div className="full-block">
              {/* <div className="side-view">
          <img src="../image/signup.png" alt="login-side-view" />
        </div> */}
              <div className="login">
                  {/* <h2>{forgotLocales.welcome[lang]}</h2> */}
                  <h1>{forgotLocales.grossjungig[lang]}</h1>
                  <h3>{forgotLocales.prompt[lang]}</h3>
                  <div className="profile-form">
                      {isEmailSent ? (
                          <div>
                              <h3>
                                  {' '}
                  If the email is in our system the password reset email was
                  Successfully Sent!
                              </h3>
                          </div>
                      ) : (
                          <div>
                              <form onSubmit={this.sendEmail}>
                                  {/* <label htmlFor="email">{loginLocales.email[lang]}</label> */}
                                  <TextField
                                      margin="normal"
                                      label={loginLocales.email[lang]}
                                      fullWidth
                                      variant="outlined"
                                      type="text"
                                      id="email"
                                      name="email"
                                      value={email}
                                      onChange={this.handleChange('email')}
                                  />
                                  {showError && (
                                      <div>
                                          <p>{errorMessage}</p>
                                      </div>
                                  )}
                                  <Button
                                      style={{
                                          marginRight: '5px',
                                          color: 'white',
                                          backgroundColor: '#365da7',
                                      }}
                                      variant="contained"
                                      type="submit"
                                  >
                                      {forgotLocales.submit[lang]}
                                  </Button>
                                  <Link style={{ textDecoration: 'none' }} to="/">
                                      <Button variant="contained" type="">
                                          {forgotLocales.return[lang]}
                                      </Button>
                                  </Link>
                              </form>
                          </div>
                      )}
                  </div>
              </div>
          </div>
      );
  }
}

export default ForgotPassword;
