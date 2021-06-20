import React, { Component } from "react";
import nlStyles from './index.module.css'
import bg from "../../../../assets/images/backgrounds/Rectangle 27.png"

class NewsLetter extends Component {

    render() {
        return (
            <div className={nlStyles.popup}>
                <div className={nlStyles.popup_inner}>
                    <div>
                        <div>
                            <img src={bg} style={{ height: "70vh" }} ></img>
                        </div>

                        <div style={{ display: "flex" }}>
                            <div className={nlStyles.close}>
                                <button>X</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        )
    }

}



export default NewsLetter;