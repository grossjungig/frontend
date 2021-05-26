import React, { useState } from 'react'
import arrow from "../../assets/icons/arrow.svg"

const Question = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false)
  const openQuestion=()=>{
    setExpanded(!expanded)

  }
  const lang=localStorage.getItem("lang")

  return (
    <article>
      <div className="question">
        <h4 onClick={() => setExpanded(!expanded)} className='question-title'>
          {question[lang]}
        </h4>
        <button  onClick={openQuestion}>
          {/* {expanded ? <AiOutlineMinus /> : <AiOutlinePlus />} */} <img className={expanded?"rotate":""} src={arrow}></img>
        </button>
      </div>
      {expanded && <p className="answer">{answer[lang]}</p>}
    </article>
  )
}

export default Question
