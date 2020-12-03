import React from 'react'
import { withRouter } from 'react-router-dom'
import LandingPage from '../components/LandingPage/LandingPage'

const MainPage = (props) => {
    setTimeout(() => {
        props.history.push('./restaurants')
    }, 3000)

    return (
        <>
            <LandingPage></LandingPage>
        </>
    )
}

export default withRouter(MainPage)
