import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from '../../axios';
import locales from "../../locales/locales.forgotpassword.json";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import styles from './index.module.css';
import { fullBlock } from '../../shared/index.module.css';

const ForgotPassword = () => {
  const lang = localStorage.getItem('lang');
  const [email, setEmail] = useState('');
  const history = useHistory();
  
  const submitEmail = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`api/auth/forgotPassword`, { email });
      if (res.status === 200) {
        alert('Please check your email');
        history.push('/');
      }
    } catch (err) {
      console.log({...err});
    }
  };

  return (
    <div className={fullBlock}>
      <div className={styles.main}>
        <h1>{locales.grossjungig[lang]}</h1>
        <h3>{locales.prompt[lang]}</h3>
        <form>
          <TextField
            fullWidth
            label={locales.email[lang]}
            margin="normal"
            onChange={({target}) => { setEmail(target.value); }}
            type="email"
            variant="outlined"
          />
          <Button
            className={styles.submitBtn}
            variant="contained"
            onClick={submitEmail}
          >
            {locales.submit[lang]}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
