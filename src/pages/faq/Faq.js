import React,{ useState}  from "react";
import styles from  "./faq.module.css"
import SingleQuestion from './Question'
import faqLocales from "../../locales/locales.faq.js";


const Faq=()=>{
    const [questions, ] = useState(faqLocales)

    return (
      <><div className={styles.header}><p className={styles.headerTxt}>FAQ</p></div>
      
          <div className={styles.container}>
            {questions.map((question) => (
              <SingleQuestion key={question.id} {...question} />
            ))}
          </div>
          </>
    
    )
}

    export default Faq
