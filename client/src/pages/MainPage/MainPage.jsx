import React from 'react'
import { withRouter } from 'react-router-dom'
import './MainPage.css'

class MainPage extends React.Component {
    constructor(props) {
        super(props)
    }

    goToListing() {
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
                            <p className="main">HAPPY TIMES</p>
                            <p className="sub typed"></p>
                        </div>
                        <div>
                            <button
                                onClick={this.goToListing.bind(this)}
                                type="button"
                                className="btn btn-dark btn-lg main-page-button"
                            >
                                Enter The Happy World
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(MainPage)
