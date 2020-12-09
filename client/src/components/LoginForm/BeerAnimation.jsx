import React, { useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import './Login.css'

function BeerAnimation() {
  const container = useRef(null)

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,

      animationData: require('./30697-loading-beer-animation.json'),
    })
  }, [])

  return (
    <div className="BeerAnimation">
      <div className="containerL" ref={container}></div>
    </div>
  )
}

export default BeerAnimation
