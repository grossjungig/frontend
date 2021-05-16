import React, { Component } from "react";
import cbStyles from './index.module.css'

class  Checkbox extends Component{

    render(){
        var {item, checked, handleHelp} = this.props
        return(
        <div>
               <label className= {cbStyles.container}>
                {item.label}
                <input type='checkbox' className= {cbStyles.checkbox} name={item.name} onChange={handleHelp} checked={checked}/>
                <span className={cbStyles.checkmark}/>
                </label>           
        </div>
        )
    }
  
}



export default Checkbox;