import React, { Component } from "react";
import axios from "axios";

import img from './home/header_image.png';
// import {Card, CardPrimaryContent,CardMedia,Headline6, Subtitle2} from "@material/card";
// import imagePeople from "/Users/nidanurgunay/Desktop/grossjungig/frontend/public/image/EU.jpeg";
// import { Card } from 'react-bootstrap';
// import { Card, CardPrimaryContent, CardMedia } from "@material/card"
// import {
//     Card, CardImg, CardText, CardBody,
//     CardTitle, CardSubtitle, Button
// } from 'reactstrap';

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
        console.log(this.state.people);
        return (<div> {
            this.state.people.map((el) => {
                return (
                   
                    <div style={{display:"flex", justifyContent:"center"}}>
                        <div className="card_people">
                            <div className="card_img">
                            <img src={img}  style={{width:"100%"}}/> 
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

  {/* <p > {el.name}, {el.age} </p>
                        <p > {el.district} </p>
                        <p > {el.price} </p>   */}