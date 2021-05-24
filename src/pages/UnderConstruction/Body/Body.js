import React, {Component} from 'react';
import bodyLocales from '../../../locales/locales.underconstruction.json';
import axios from '../../../axios';

import styles from './index.module.css';

class Body extends Component {
    state = {
        name:'',
        email:'',
        phone: '',
        role: '',
        message:'',
    }

    handleChange = (event) => {
        event.persist()
        this.setState({
            [event.target.name]: event.target.value
        });
      }

    handleSubmit = () => {
        const lang = localStorage.getItem("lang");
        axios.post('/api/auth/underConstruction', {
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        role: this.state.role
        }).then(response => {
            this.props.history.push('/aboutus');
            alert(bodyLocales.success_msg[lang]);
        }).catch( err => {
            this.setState({
                message:"Missing Fields"
            })
        })
    }
    
render(){
    const lang = localStorage.getItem("lang");
    const { name, email, phone, message } = this.state;
    return (
     <div className={`${styles.cmp} ${styles.bg}`}>
        <div>
           <h2 className={styles.header}>{bodyLocales.soon[lang]}</h2>
        </div>
           
        <div className={styles.main_container} >
            {/* Info Container */}
        <div className={`${styles["info_container"]} ${styles["card_container"]}`}>

        <h2 className={styles["info_header"]}>{bodyLocales.info[lang]}</h2>

        <div className={styles["step-container"]}>
        <p className={styles["step-num"]}>1</p>
        <h2 className={styles["step-text"]}>{bodyLocales.one[lang]} </h2>
        </div>

        <div className={styles["step-container"]}>
        <p className={styles["step-num"]}>2</p>
        <h2 className={styles["step-text"]}>{bodyLocales.two[lang]}</h2>
        </div>

        <div className={styles["step-container"]}>
        <p className={styles["step-num"]}>3</p>
        <h2 className={styles["step-text"]}>{bodyLocales.three[lang]}</h2>
        </div>
        </div>
        
        <div className={`${styles["signup_container"]} ${styles["card_container"]}`}>
        <h2 className={styles["info_header"]}>{bodyLocales.discount[lang]}</h2>
        <h2 className={styles["signup_text"]}>{bodyLocales.access[lang]}</h2>


        <label className={styles["label_text"]}>{bodyLocales.name[lang]} <span className={styles.required}>*</span></label>
        <input type="text" name="name" value={name} required onChange={this.handleChange}/>
        <label className={styles["label_text"]}>{bodyLocales.email[lang]} <span className={styles.required}>*</span></label>
        <input type="text" name="email" required value={email} onChange={this.handleChange}/>
        <label className={styles["label_text"]}>{bodyLocales.number[lang]}</label>
        <input type="tel" name="phone" value={phone} onChange={this.handleChange}/>
        <label className={styles["label_text"]}></label>
        <label className={styles["label_text"]}>{bodyLocales.role[lang]}<span className={styles.required}>*</span></label>
        <label className={styles["label_text"]}>
        <input type="radio" name="role" value="senior" onChange={this.handleChange}/>
        {bodyLocales.senior[lang]}
        </label>
        <label className={styles["label_text"]}>
        <input className={styles["radio"]} type="radio" name="role" value="junior" onChange={this.handleChange}/>
        {bodyLocales.junior[lang]}
        </label>
        <div className={styles.required}>{message}</div>
        <button className={`${styles["white_button"]} ${styles["button_text"]}`} type='submit' onClick={this.handleSubmit}>{bodyLocales.signup[lang]}</button>

        </div>
      </div>
    </div>
    )
}
}

export default Body;