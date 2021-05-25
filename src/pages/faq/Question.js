import React, { useState } from 'react'
// import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
const Question = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <article className='question'>
      <header>
        <h4 onClick={() => setExpanded(!expanded)} className='question-title'>
          {question}
        </h4>
        <button className='btn' onClick={() => setExpanded(!expanded)}>
          {/* {expanded ? <AiOutlineMinus /> : <AiOutlinePlus />} */} some tx
        </button>
      </header>
      {expanded && <p>{answer}</p>}
    </article>
  )
}

export default Question
