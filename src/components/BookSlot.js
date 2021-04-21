import firebase, { auth } from "../firebase/firebase";
import React, { Component } from "react";
import Calendar from "react-calendar";

class BookSlot extends Component {
  constructor() {
    super();
    this.state = {
      date: new Date(),
      currentID:"",
    };
  }
  bookDate = (date) => {
    const db = firebase.firestore();
    db.collection("User")
      .where("Email", "==", auth.currentUser.email)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.setState(
            {
              currentID: doc.id,
            },
            () => {
              db.collection("User").doc(this.state.currentID).update({
                Date: this.state.date,
              });
              window.alert("Date booked");
              this.props.history.push("/");
            }
          );
        });
      });
}

  onChange = (date) =>
    this.setState({
      date,
    });

  render() {
    return (
      <div>
        <div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <Calendar onChange={this.onChange} value={this.state.date} />
          {console.log(this.state.date)}
        </div>
        <div>
          <button onClick={this.bookDate}> Book </button>
        </div>
      </div>
    );
  }
}
export default BookSlot;