import React, { useState, useEffect } from 'react'
import './LandingPage.css'
import desktopImage from '../../assets/bottles.jpg'
import mobileImage from '../../assets/drink-flower.jpg'

const LandingPage = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const imageUrl = windowWidth >= 650 ? desktopImage : mobileImage

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleWindowResize)

        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [])

    return (
        <div
            className="landing5-image"
            style={{ backgroundImage: `url(${imageUrl})` }}
        >
            <div className="landing5-content">
                <h1>Hey Calgary!</h1>
                <h2>Welcome to Happy Times!</h2>
            </div>
        </div>
    )
}

export default LandingPage
