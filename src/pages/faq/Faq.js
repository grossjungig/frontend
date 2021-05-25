// import { Accordion } from "@material-ui/core";

import React,{ useState, useEffect }  from "react";
import "./faq.css"
import SingleQuestion from './Question'



let questionsAnswers = [
    {id:"1",
    visible:true,
      question: "testq",
      answer:
        "Test A lorem ipsum",
    },
    {id:"2",
    visible:true,

      question: "testq",
      answer:
        "Test A lorem ipsum",
    } ]
   


const Faq=()=>{
    const [questions, setQuestions] = useState(questionsAnswers)

    return (
      <main>
        <div className='container'>
          <section className='info'>
            {questions.map((question) => (
              <SingleQuestion key={question.id} {...question} />
            ))}
          </section>
        </div>
      </main>
    )
}

    export default Faq
