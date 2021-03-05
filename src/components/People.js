import React, { Component } from "react";
import axios from "axios";
import img from '../assets/images/header_image.png';


export default class People extends Component {
    state = {
        people: [],
    };

    async componentDidMount() {
        const response = await axios.get(
            `${process.env.REACT_APP_BACKENDURL}api/profiles`
        );
      
        // Set state
        this.setState({
            people: response.data.profiles,
        });
    }
    render() {
       
        return (<div> {
            this.state.people.map((el) => {
                return (
                   
                    <div style={{display:"flex", justifyContent:"center"}}>
                        <div className="card_people">
                            <div className="card_img">
                            <img src={img} alt="person" style={{width:"100%"}}/> 
                            </div>
                                <div class="container_people">
                                    <h4><b>{el.name}, {el.age}</b></h4>
                                    <p>{el.district}</p>
                                    <p>{el.price}</p>
                                </div>
                        </div>
                    </div>        
                            
                          
                    
                );
            })
        } </div>);
            }
}

 
