import React from 'react'
import './PaddedContainerClient.css'
import WoodImage from '../../assets/wood.jpg'

class PaddedContainerClient extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div
                className="ui raised very padded container segment"
                style={{ backgroundImage: `url(${WoodImage})`, color: 'white' }}
            >
                {this.props.children}
            </div>
        )
    }
}

export default PaddedContainerClient
