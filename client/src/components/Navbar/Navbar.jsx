import React from 'react'
import { withRouter } from 'react-router-dom'
import './Navbar.css'

class Navbar extends React.Component {
    constructor(props) {
        super(props)
    }

    goToRestaurants() {
        this.props.history.push('/restaurants')
    }

    goToMap() {
        this.props.history.push('/map')
    }

    render() {
        return (
            <>
                <ul className="nav justify-content-end navbar-details">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">
                            About
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            onClick={this.goToRestaurants.bind(this)}
                        >
                            Restaurants
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            onClick={this.goToMap.bind(this)}
                        >
                            Map
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Login
                        </a>
                    </li>
                </ul>
            </>
        )
    }
}

export default withRouter(Navbar)
