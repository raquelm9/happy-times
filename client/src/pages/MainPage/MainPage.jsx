import React from 'react'
import { withRouter } from 'react-router-dom'
import './MainPage.css'

const MainPage = (props) => {
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
                </div>

                <nav className="slides-navigation">
                    <a className="next"></a>
                    <a className="prev"></a>
                </nav>
            </div>
        </>
    )
}

export default withRouter(MainPage)
