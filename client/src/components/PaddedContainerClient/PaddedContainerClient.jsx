import React from 'react'
import './PaddedContainerClient.css'

class PaddedContainerClient extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props.menu)
    }

    render() {
        return (
            <div
                className="ui raised very padded container segment"
                style={{
                    backgroundColor: '#ece7db',
                    color: 'black',
                    marginTop: '100px',
                }}
            >
                {this.props.children}
            </div>
        )
    }
}

export default PaddedContainerClient
