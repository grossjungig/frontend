import React, { Component } from "react";
import axios from "axios";

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
    return (
      <div>
        {this.state.people.map((el) => {
          return (
            <div>
              <p>
                {el.name}, {el.age}
              </p>
              <p>{el.district}</p>
              <p>{el.price}</p>
            </div>
          );
        })}
      </div>
    );
  }
}
