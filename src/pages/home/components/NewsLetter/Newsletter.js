import React, { Component } from "react";
import nlStyles from './index.module.css'
import bg from "../../../../assets/images/backgrounds/Rectangle 27.png"
import newsletterlocales from "../../../../locales/locales.newsletter.json"
import TextField from "@material-ui/core/TextField";
import MailchimpSubscribe from "react-mailchimp-subscribe"

class NewsLetter extends Component {
    state = {
        name: '',
        email: '',
        width: 0, height: 0
    };

    constructor(props) {
        super(props)

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
    setFormState = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };
    close = (event) => {
        this.props.callbackFromParent(false);
    };

    render() {
        const lang = this.props.lang;
        return (
          
                <div className={nlStyles.popup}>

                    {
                        this.state.width < 677 ?
                            <div className={nlStyles.popup_outer} >
                                <div className={nlStyles.popup_inner}>
                                    <div className={nlStyles.close}>
                                        <button onClick={(e) => this.close(e)}>X</button>
                                    </div>
                                    <div className={nlStyles.text_area}>
                                        <h2 className={nlStyles.header}>{newsletterlocales.header[lang]}</h2>
                                        <div className={nlStyles.text}>{newsletterlocales.text[lang]}</div>
                                        <form className={nlStyles.form} onSubmit={this.handleSubmit}>
                                            
                                            <label className={nlStyles.text}>{newsletterlocales.name[lang]}</label>

                                            <TextField
                                                margin="normal"
                                                fullWidth
                                                variant="outlined"
                                                type="name"
                                                name="name"
                                                id="name"
                                                value={this.state.name}
                                                onChange={this.setFormState}
                                                style={{ backgroundColor: "#cee6ef" }}
                                            />
                                            <label className={nlStyles.text} style={{ marginTop: "5px" }}>{newsletterlocales.email[lang]}</label>
                                            <TextField
                                                margin="normal"
                                                fullWidth
                                                variant="outlined"
                                                type="email"
                                                name="email"
                                                id="email"
                                                value={this.state.email}
                                                onChange={this.setFormState}
                                                style={{ backgroundColor: "#cee6ef" }}
                                            />

                                            <button className={nlStyles.button}>
                                                {newsletterlocales.signUp[lang]}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className={nlStyles.popup_inner}>
                                <div className={nlStyles.div_img}>
                                    <img src={bg} className={nlStyles.img} alt="newsletter"></img>
                                </div>

                                <div className={nlStyles.div_text} style={{ display: "flex" }}>
                                    <div className={nlStyles.close}>
                                        <button onClick={(e) => this.close(e)}>X</button>
                                    </div>

                                    <div className={nlStyles.text_area}>
                                        <h2 className={nlStyles.header}>{newsletterlocales.header[lang]}</h2>
                                        <div className={nlStyles.text}>{newsletterlocales.text[lang]}</div>
                                        <form className={nlStyles.form} onSubmit={this.handleSubmit}>

                                            <label className={nlStyles.text}>{newsletterlocales.name[lang]}</label>

                                            <TextField
                                                margin="normal"
                                                fullWidth
                                                variant="outlined"
                                                type="name"
                                                name="name"
                                                id="name"
                                                value={this.state.name}
                                                onChange={this.setFormState}
                                                style={{ backgroundColor: "#cee6ef" }}
                                            />
                                            <label className={nlStyles.text} style={{ marginTop: "5px" }}>{newsletterlocales.email[lang]}</label>
                                            <TextField
                                                margin="normal"
                                                fullWidth
                                                variant="outlined"
                                                type="email"
                                                name="email"
                                                id="email"
                                                value={this.state.email}
                                                onChange={this.setFormState}
                                                style={{ backgroundColor: "#cee6ef" }}
                                            />

                                            <button className={nlStyles.button}>
                                                {newsletterlocales.signUp[lang]}
                                            </button>

                                        </form>
                                    </div>
                                </div>
                            </div>
                    }

                </div>
            
        )
    }

}



export default NewsLetter;