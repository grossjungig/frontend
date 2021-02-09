import React, { Component } from "react";
import axios from "axios";

//In progress
class EditProfile extends Component {
    state={
        profile:[],
    }
    componentDidMount(){
     axios.get(`${process.env.REACT_APP_BACKENDURL}api/profiles/${this.props.user.profile}`)
      .then((edit) => {
        this.setState({
          profile: edit.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    }
    render() {
        console.log(this.state.profile)
        return <div>Hello</div>
    }
}
export default EditProfile
