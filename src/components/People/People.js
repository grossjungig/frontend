import React, { Component } from "react";
import axios from "axios";
import img from "../../assets/images/header_image.png";

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
  handleClick(_id) {
    this.props.history.push(`/profile/${_id}`);
  }
  render() {
    return (
      <div>
        {" "}
        {this.state.people.map((el) => {
          return (
            <div
              style={{ display: "flex", justifyContent: "center" }}
              onClick={() => this.handleClick(el._id)}
              key={el._id}
            >
              <div className="card_people">
                <div className="card_img">
                  <img src={img} alt="person" style={{ width: "100%" }} />
                </div>
                <div className="container_people">
                  <h4>
                    <b>
                      {el.name}, {el.age}
                    </b>
                  </h4>
                  <p>{el.district}</p>
                  <p>{el.price}</p>
                </div>
              </div>
            </div>
          );
        })}{" "}
      </div>
    );
  }
}
