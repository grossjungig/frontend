import React from "react";
import style from "./index.module.css"

const Spinner = () => (
    <div className={style.container}>
    <div className={style["spinner-square"]}>
    <div className={`${style["square-1"]} ${style.square}`} ></div> 
    <div className={`${style["square-2"]} ${style.square}`}></div>
    <div className={`${style["square-3"]} ${style.square}`}></div>
    </div>
</div>

)

export default Spinner;