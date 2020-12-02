import React from 'react'
import './PaddedContainerSegment.css'
import WoodImage from '../../assets/wood.jpg'

class PaddedContainerSegment extends React.Component {
    constructor(props) {
        super(props)
    }

    handleClick(event) {
        if (this.props.onClick) {
            event.stopPropagation()
            this.props.onClick()
        }
    }

    render() {
        return (
            <div
                className="ui raised very padded container segment"
                style={{ backgroundImage: `url(${WoodImage})`, color: 'white' }}
                onClick={this.handleClick.bind(this)}
            >
                {this.props.children}
            </div>
        )
    }
}

export default PaddedContainerSegment
