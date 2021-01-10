import React from 'react'
import { withRouter } from 'react-router-dom'
import './MainPage.css'

class MainPage extends React.Component {
  constructor(props) {
    super(props)
  }

  goToLogin() {
    this.props.history.push('/restaurants')
  }

  render() {
    return (
      <>
        <div id="slides">
          <div className="overlay"></div>

          <div className="slides-container">
            <img src={require('../../assets/img10.jpg')} />
            <img src={require('../../assets/img11.jpg')} />
            <img src={require('../../assets/img6.jpg')} />
            <img src={require('../../assets/img5.jpg')} />
          </div>

          <div className="titleMessage">
            <div className="heading">
              <div>
                <p className="main">HAPPY TIMES</p>
              </div>
              <div className="eat-drink-repeat">
                <p className="sub typed"></p>
              </div>
            </div>
            <div>
              <button
                onClick={this.goToLogin.bind(this)}
                type="button"
                className="btn btn-dark btn-lg main-page-button"
              >
                Enter The Happy World
              </button>
              <p className="second">
                Important: This app is intended to show the skills of the
                developer, it is not for public use.
              </p>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(MainPage)
