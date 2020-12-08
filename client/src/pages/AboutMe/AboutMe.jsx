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
            <>
                <Navbar></Navbar>
                <h1>Hello</h1>
            </>
        )
    }
}

export default withRouter(AboutMe)
