// import { Accordion } from "@material-ui/core";

import React,{ useState, useEffect }  from "react";
import "./faq.css"
import SingleQuestion from './Question'
import faqLocales from "../../locales/locales.faq.js";


const Faq=()=>{
    const [questions, setQuestions] = useState(faqLocales)

    return (
      
          <section>
            {questions.map((question) => (
              <SingleQuestion key={question.id} {...question} />
            ))}
          </section>
    
    )
}

    export default Faq
