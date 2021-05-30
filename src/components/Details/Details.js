import React, { Component } from "react";
import axios from '../../axios';
//import detailsLocales from "../../locales/locales.details.json";
import { connect } from 'react-redux';

import { fullBlock } from '../../shared/index.module.css'
import styles from '../Profile/index.module.css'; //style from profile


class Details extends Component {
  state = {
    room: [],
  };

  componentDidMount() {
    const roomId = this.props.match.params.id;
    axios.get(`api/rooms/${roomId}`).then(response => {
      this.setState({
        room: response.data
      })
    }).catch(err => {
      console.log(err)
    })
  }

  getAge(dateString){
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
  }

  deleteRoom = async (event) => {
    event.preventDefault();
    const deleteRoomId = this.props.match.params.id;
    await axios.delete(`api/rooms/${deleteRoomId}/delete`).then(response => {
      this.props.history.push("/rooms");
    })
  };

  render() {
    //const lang = localStorage.getItem("lang");
    const room = this.state.room;
    const user = this.props.fetchedUser;

    if(room.length !== 0){
    return(
      <div className={fullBlock}> 
        <div className={styles.main}>
          <div className={styles.msg}>
            If you are interested in this room, please contact info@grossjungig.de or +49 30 55231271
          </div>
          <h3>{room.roomTitle}</h3>
          <img  alt="avatar" className={styles.pic} />
          <div className={styles.details}>
            <span>Owner</span><span>{room.name}</span>
            <span>Gender</span><span>{room.gender}</span>
            <span>Age</span><span>{this.getAge(room.birthdate)}</span>
            <span>Price</span> <span>{room.price}€/month</span>
            <span>Additional Cost</span><span>50€/month</span>
            <span>Room In</span><span>{room.district}</span>
            <span>Help with</span>
            <span>
              {room.expectedHelp.map(
                help => <span key = {help}>{help}, </span>)}
            </span>
            <span>Bio</span>
            <span className={styles.bio} >"{room.description}"</span>
          </div>
          {user && user._id === room.user ? 
            <div className={styles.ctrl}>
              <button className={styles.btn}>Edit Room</button>
            <button 
              className={`${styles.btn} ${styles.delBtn}`}
              onClick={this.deleteRoom}>Delete Room</button>
          </div> : null}
        </div>
      </div>
    )
  }else{
    return 'loading ...'
  }
}
}
const mapStateToProps = (reduxState) => ({
  fetchedUser: reduxState.user
});

export default connect(mapStateToProps)(Details);
