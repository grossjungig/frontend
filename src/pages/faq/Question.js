import React, { useState } from 'react'
import arrow from "../../assets/icons/arrow.svg"
import styles from  "./faq.module.css"

const Question = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false)
  const openQuestion=()=>{
    setExpanded(!expanded)

  }
  const lang=localStorage.getItem("lang")

  return (
    <div>
      <div className={styles.question}>
        <h4 onClick={() => setExpanded(!expanded)}>
          {question[lang]}
        </h4>
        <button  onClick={openQuestion}>
           <img alt="" className={expanded?styles.rotate:""} src={arrow}></img>
        </button>
      </div>
      {expanded && <p className={styles.answer}>{answer[lang]}</p>}
    </div>
  )
}

export default Question;