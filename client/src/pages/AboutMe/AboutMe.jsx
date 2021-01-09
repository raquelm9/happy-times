import React from 'react'
import { withRouter } from 'react-router-dom'
import './AboutMe.css'
import Navbar from '../../components/Navbar/Navbar'

class AboutMe extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="about">
        <Navbar></Navbar>
        <div className="img-fluid container-image-background">
          <div className="titleMessage">
            <div className="heading">
              <div className="container background-story">
                <p className="main">About Us</p>
                <br></br>
                <p className="second">Our Story</p>
                <br></br>
                <p className="third">
                  We are four aspiring developers, eager to help you find a
                  Happy Hour near your location, so you can enjoy the best
                  moments with your friends and loved ones.
                  <br />
                  <br />A lot has happened in 2020, motivating us to create this
                  application for Albertans. We are proud to help people in
                  Calgary and nearby communities who want to visit new places in
                  an affordable and safe way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(AboutMe)
