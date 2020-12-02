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

    styleOfContainer() {
        if (!this.props.itemContainer) {
            return (
                <>
                    <div className="ui raised very padded container segment">
                        {this.props.children}
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div
                        className="ui raised very padded container segment item-container"
                        onClick={this.handleClick.bind(this)}
                    >
                        {this.props.children}
                    </div>
                </>
            )
        }
    }

    render() {
        return <>{this.styleOfContainer()}</>
    }
}

export default PaddedContainerSegment
