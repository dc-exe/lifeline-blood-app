import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase, { auth } from "../firebase/firebase";

import donate from "../images/donateVector.png";
import donateblood from "../images/Donating-Blood-1.svg";
import "../static/receiverrequest.css";
import { BeatLoader } from "react-spinners"
import { css } from "@emotion/core";
const override = css`
  margin-top: 250px;
  margin-left: 650px;
  position: fixed; 
  top: 100px;  
`;

class ViewRecievers extends React.Component {
  constructor() {
    super();
    this.state = {
      Donation_Request: [],
      Recievers: [],
      email: "",
      isLoading: true
    };
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    firebase.auth().onAuthStateChanged(
      function (user) {
        console.log(user);
        this.setState({ email: user.email }, () => {
          const db = firebase.firestore();
          db.collection("User")
            .where("Email", "==", this.state.email)
            .where("Donation_complete", "==", "true")
            .get()
            .then((querySnapshot) => {
              const data = querySnapshot.docs.map((doc) => doc.data());
              console.log("here is data", data);
              this.setState({ Donation_Request: data });
              this.setState({ isLoading: false });
            });
          db.collection("Receiver")
            .get()
            .then((querySnapshot) => {
              const data = querySnapshot.docs.map((doc) => doc.data());
              console.log("here is data", data);
              this.setState({ Recievers: data });
              this.setState({ isLoading: false });
            });
        });
      }.bind(this)
    );
  }

  render() {
    const { Recievers } = this.state;
    const { Donation_Request } = this.state;
    const { isLoading } = this.state;

    if (isLoading) {
      return <BeatLoader        
      color='red'
      size={70}
      css = {override}
      loading/>;
    }
    return (
      <div className="containermain">
        <div className="sidebar">
          <div className="menu">
            <ul>
              <li>
                <div className="menulist">
                  <Link
                    to="/dashboard"
                    style={{ textDecoration: "none" }}
                    className="link"
                  >
                    <img src="https://img.icons8.com/fluent-systems-regular/48/000000/dashboard-layout.png" />
                    <h3>Dashboard</h3>
                  </Link>
                </div>

                <div className="menulist">
                  <Link
                    to="/receiverrequest"
                    style={{ textDecoration: "none" }}
                    className="link"
                  >
                    <img src="https://img.icons8.com/material-outlined/24/000000/invite.png" />

                    <h3>Request Blood</h3>
                  </Link>
                </div>

                <div className="menulist">
                  <Link
                    to="/Donor_Profile"
                    style={{ textDecoration: "none" }}
                    className="link"
                  >
                    <img src="https://img.icons8.com/fluent-systems-regular/48/000000/drop-of-blood.png" />

                    <h3>Donate Blood</h3>
                  </Link>
                </div>

                <div className="menulist">
                  <Link
                    to="/TrackApplication"
                    style={{ textDecoration: "none" }}
                    className="link"
                  >
                    <img src="https://img.icons8.com/material/24/000000/hospital-2.png" />
                    <h3>Track Application</h3>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
          <div className="why">
            <h3>
              <Link to="/WhyDonateBlood" style={{ fontWeight: "600" }}>
                Why Donate Blood?
              </Link>
            </h3>
            <div className="donateVector">
              <Link to="/WhyDonateBlood">
                <img src={donate} alt="why donate" />
              </Link>
            </div>
          </div>
        </div>
        <div className="container2">
          <div class="request-card view">
            <div class="request-card-1 view">
              <h3> My Requests</h3>
              {Donation_Request.map((user) => (
                <div key={user.uid} class="list">
                  <h5>
                    {" "}
                    {user.FirstName} {user.LastName}
                  </h5>
                  <div>
                    <h6>Age:{user.Age}</h6>
                    <h6>Blood Group : {user.Bloodgrp}</h6>
                    <h6>Appointment_hospital : {user.Appointment_hospital}</h6>
                    <h6>Contact : {user.Contact}</h6>
                    <h6>City : {user.City} </h6>
                    <h6>Donation: {user.Donation_complete}</h6>
                  </div>
                </div>
              ))}
            </div>
            <div class="request-card-1 view">
              <h3>Patient's List</h3>
              {Recievers.map((user) => (
                <div key={user.uid} className="list">
                  <h5>
                    {user.FirstName} {user.LastName}
                  </h5>
                  <div>
                    <h6>Blood Group : {user.BloodGrp}</h6>
                    <h6>Contact : {user.ContactDetails}</h6>
                    <h6>Post : {user.Post}</h6>
                    <h6>Hospital : {user.Hospital}</h6>
                    <h6>City : {user.City} </h6>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewRecievers;
