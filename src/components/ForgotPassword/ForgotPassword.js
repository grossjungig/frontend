import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from '../../axios';
import locales from "../../locales/locales.forgotpassword.json";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import styles from './index.module.css';
import mainStyles from '../../shared/index.module.css';
import CircularProgress from '@material-ui/core/CircularProgress';

const ForgotPassword = () => {
  const lang = localStorage.getItem('lang');
  const [email, setEmail] = useState('');
  const [hasErr, setHasErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  
  const submitEmail = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    try {
      const res = await axios.post(`api/auth/forgotPassword`, { email });
      setIsLoading(false);
      if (res.status === 200) {
        alert(locales.successMsg[lang]);
        history.push('/');
      }
    } catch (err) {
      setIsLoading(false);
      const errType = err.response.data.data[0]
      if (errType === 'EMAIL_NOT_FOUND') setHasErr(true);
    }
  };

  const handleChange = ({target}) => {
    setHasErr(prev => {
      if (!prev) return false
    });
    setEmail(target.value);
  }

  return (
    <div className={mainStyles.fullBlock}>
      <div className={styles.main}>
        <h1>{locales.grossjungig[lang]}</h1>
        <h3>{locales.prompt[lang]}</h3>
        <form>
          <TextField
            fullWidth
            label={locales.email[lang]}
            margin="normal"
            onChange={handleChange}
            type="email"
            variant="outlined"
            error={hasErr}
          />
          <Button
            className={styles.submitBtn}
            variant="contained"
            onClick={submitEmail}
            type="submit"
          >
            {
              isLoading ?
              <CircularProgress className={styles.progress} size={30} /> :
              locales.submit[lang]
            }
          </Button>
          { hasErr && <p className={mainStyles.error}>Email not found!</p> }
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
