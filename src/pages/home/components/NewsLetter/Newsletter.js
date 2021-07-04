import React from 'react';
import { useState, useEffect } from "react";
import nlStyles from './index.module.css'
import bg from "../../../../assets/images/backgrounds/Rectangle 27.png"
import newsletterlocales from "../../../../locales/locales.newsletter.json"
import TextField from "@material-ui/core/TextField";
import MailchimpSubscribe from "react-mailchimp-subscribe"

const CustomForm = ({ callbackFromParent, status, message, onValidated }) => {
    const lang = localStorage.getItem("lang")
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [preventionRerender, setpreventionRerender] = useState(true);

    useEffect(() => {
        if (status === "success") {
            if (preventionRerender === true) {
                alert(newsletterlocales.success_message[lang]);
                callbackFromParent("success");
                setpreventionRerender(false);
            }
        }
        else if (status === "error") {
            if (preventionRerender === true) {
                alert(newsletterlocales.error_message[lang]);
                callbackFromParent("error");
                clearFields();
            }
        }
    }, [status, callbackFromParent, lang, preventionRerender])
    const clearFields = () => {
        setName('');
        setEmail('');
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        email && name && email.indexOf("@") > -1 && onValidated({
            MERGE0: email,
            MERGE1: name,
        });
    }
    return (
        <form className={nlStyles.form} onSubmit={(e) => handleSubmit(e)} >
            <div>
                <div>
                    <label className={nlStyles.text}>{newsletterlocales.name[lang]}</label>
                    <TextField
                        margin="normal"
                        fullWidth
                        variant="outlined"
                        type="name"
                        name="name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ backgroundColor: "#cee6ef" }}
                    />
                    <label className={nlStyles.text} style={{ marginTop: "5px" }}>{newsletterlocales.email[lang]}<span>*</span></label>
                    <TextField
                        margin="normal"
                        fullWidth
                        variant="outlined"
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ backgroundColor: "#cee6ef" }}
                    />
                    <button className={nlStyles.button} type="submit">
                        {newsletterlocales.signUp[lang]}
                    </button>
                </div>
            </div>
        </form>
    );
};
const NewsLetter = props => {
    const size = useWindowSize();
    const close = (event) => {
        props.callbackFromParent(false);
    };
    const [status, setStatus] = useState('');
    if (status === "success") {
        props.callbackFromParent(false);
    }
    const MailchimpSubscribes = () => {
        return (
            <>
                <div className={nlStyles.close}>
                    <button onClick={(e) => close(e)}>X</button>
                </div>
                <div className={nlStyles.text_area}>
                    <h2 className={nlStyles.header}>{newsletterlocales.header[lang]}</h2>
                    <div className={nlStyles.text}>{newsletterlocales.text[lang]}</div>
                    <MailchimpSubscribe
                        url={postUrl}
                        render={({ subscribe, status, message }) => (
                            <CustomForm
                                callbackFromParent={setStatus}
                                status={status}
                                message={message}
                                onValidated={formData => subscribe(formData)}
                            />
                        )}
                    ></MailchimpSubscribe>
                </div>
            </>
        )
    };
    const lang = localStorage.getItem("lang")
    const postUrl = process.env.REACT_APP_MAILCHIMP_URL
    return (
        <div className={nlStyles.popup}>
            {
                size.width < 677 ?
                    <div className={nlStyles.popup_outer} >
                        <div className={nlStyles.popup_inner}>
                            {MailchimpSubscribes()}
                        </div>
                    </div>
                    :
                    <div className={nlStyles.popup_inner}>
                        <div className={nlStyles.div_img}>
                            <img src={bg} className={nlStyles.img} alt="newsletter"></img>
                        </div>
                        <div className={nlStyles.div_text} style={{ display: "flex" }}>
                            {MailchimpSubscribes()}
                        </div>
                    </div>
            }
        </div>
    )
}
/// Function to take window size 
function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });
    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []); 
    return windowSize;
}
export default NewsLetter;