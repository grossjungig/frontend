import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import detailsLocales from "../locales/locales.details.json";
import Fab from "@material-ui/core/Fab";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

class Details extends Component {
  state = {
    data: {},
  };

  async componentDidMount() {
    const roomId = this.props.match.params.id;
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKENDURL}api/rooms/${roomId}`
    ); // passing roomId to the axios call

    this.setState({
      data, //same as data:data,shorthand notation for objects
    });
  }

  //delete room
  deleteRoom = async (event) => {
    event.preventDefault();
    const deleteRoomId = this.props.match.params.id;
    await axios.delete(
      `${process.env.REACT_APP_BACKENDURL}api/rooms/${deleteRoomId}/delete`
    );

    this.props.history.push("/berlin");
  };

  render() {
    console.log(this.state.data);
    let pics =
      this.state.data.images &&
      this.state.data.images.map((image) => {
        return <img src={image.secureUrl} className="sliderimg" />;
      });
    console.log(pics);
    const lang = localStorage.getItem("lang");
    const roomId = this.props.match.params.id;
    // this allows to verify if there is a user or not so ifyou are not logged in you can still browse the various rooms
    if (this.props.user && this.props.user._id === this.state.data.owner) {
      return (
        <div className="detail-container">
          <h2>{this.state.data.name}</h2>
          <div className="markus-container">
            <div className="detail-container-text">
              <div className="paragraphs">
                <h3>{detailsLocales.address[lang]}:</h3>
                <p>{this.state.data.address}</p>
              </div>
              <div className="paragraphs">
                <h3>{detailsLocales.postcode[lang]}:</h3>
                <p>{this.state.data.postcode}</p>
              </div>
              <div className="paragraphs">
                <h3>{detailsLocales.district[lang]}:</h3>
                <p>{this.state.data.district}</p>
              </div>
              <div className="paragraphs">
                <h3>{detailsLocales.describe[lang]}:</h3>
                <p>{this.state.data.description}</p>
              </div>
              {/* <div className="paragraphs">
                <h3>{detailsLocales.phone[lang]}:</h3>
                <p>
                  <a href={"tel:" + this.state.data.phoneNumber}>
                    {this.state.data.phoneNumber}
                  </a>
                </p>
              </div>
              <div className="paragraphs">
                <h3>{detailsLocales.email[lang]}:</h3>
                <p>
                  <a href={"mailto:" + this.state.data.email}>
                    {this.state.data.email}
                  </a>
                </p>
              </div> */}
            </div>
          </div>
          <div className="photo-container">
            {this.state.data.images.map((image) => {
              return (
                <img
                  alt="room"
                  width="300px"
                  height="auto"
                  src={image.secureUrl}
                ></img>
              );
            })}
          </div>
          <div className="buttons">
            <Link to={`/uploadphotos/${roomId}`}>
              <button>{detailsLocales.images[lang]}</button>
            </Link>
            <button onClick={this.deleteRoom}>
              {detailsLocales.delete[lang]}
            </button>
            <Link to="/berlin">
              <button>{detailsLocales.return[lang]}</button>
            </Link>
          </div>
        </div>
      );
    }
    return (
      <div className="detail-container">
        <div>
          <Card>
            <CardContent>
              <Link to="/berlin">
                <div className="detail-row">
                  <ArrowBackIcon
                    style={{ padding: "10px", fontSize: 30 }}
                  ></ArrowBackIcon>
                  <p>{detailsLocales.return[lang]}</p>
                </div>
              </Link>
              <div className="detail-row">
                <p className="detail-description-title">
                  {detailsLocales.describe[lang]}:
                </p>
                <p className="detail-description-info">
                  {this.state.data.description}
                </p>
              </div>
              <div className="detail-row">
                <p className="detail-description-title">
                  {detailsLocales.address[lang]}:
                </p>
                <p className="detail-description-info">
                  {this.state.data.address}
                  <br></br> {this.state.data.postcode}{" "}
                  {this.state.data.district}
                </p>
              </div>
              <div className="detail-row">
                <p className="detail-description-title">
                  {detailsLocales.price[lang]}:
                </p>
                <p className="detail-description-info">
                  {this.state.data.price} €
                </p>
              </div>
              <div className="detail-row">
                <p className="detail-description-title">
                  {detailsLocales.additional_costs[lang]}:
                </p>
                <p className="detail-description-info"></p>
              </div>
              <div className="detail-row">
                <p className="detail-description-title">
                  {detailsLocales.owner[lang]}:
                </p>
                <p className="detail-description-info"></p>
              </div>
              <div className="detail-row">
                <p className="detail-description-title">
                  {detailsLocales.about_owner[lang]}:
                </p>
                <p className="detail-description-info"></p>
              </div>
              <div className="detail-row">
                <p className="detail-description-title">
                  {detailsLocales.expected_help[lang]}:
                </p>
                <p className="detail-description-info"></p>
              </div>
              <div className="detail-row">
                <p className="detail-description-title">
                  {detailsLocales.pictures[lang]}:
                </p>
                {/* <p className="detail-description-info"></p> */}
                <div className="detail-description-info photo-container">
                  {pics ? (
                    <AliceCarousel autoPlay autoPlayInterval="3000">
                      {pics}
                    </AliceCarousel>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="markus-container">
          <div className="detail-container-text">
            <div className="paragraphs"></div>
            <Link to="/berlin">
              <Fab
                style={{
                  backgroundColor: "#365da7",
                  color: "white",
                }}
              >
                {detailsLocales.return[lang]}
              </Fab>
            </Link>
            {/* <div className="paragraphs">
              <h3>{detailsLocales.phone[lang]}:</h3>
              <p>
                <a href={"tel:" + this.state.data.phoneNumber}>
                  {this.state.data.phoneNumber}
                </a>
              </p>
            </div>
            <div className="paragraphs">
              <h3>{detailsLocales.email[lang]}:</h3>
              <p>
                <a href={"mailto:" + this.state.data.email}>
                  {this.state.data.email}
                </a>
              </p>
            </div> */}
          </div>
        </div>
        {/* <div className="photo-container">
         
          {this.state.data.images &&
            this.state.data.images.map((image) => {
              return (
                <img
                  alt="room"
                  width="300px"
                  height="auto"
                  src={image.secureUrl}
                ></img>
              );
            })}
        </div> */}
      </div>
    );
  }
}

export default Details;
