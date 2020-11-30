import React from 'react'
import './PaddedContainerSegment.css'

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

    showNewStyle() {
        if (this.props.changeStyle) {
            return 'ui raised very padded container segment changeStyle'
        }

        return 'ui raised very padded container segment'
    }

    render() {
        return (
            <div
                className={this.showNewStyle()}
                onClick={this.handleClick.bind(this)}
            >
                {this.props.children}
            </div>
        )
    }
}

export default PaddedContainerSegment
