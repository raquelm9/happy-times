import React from 'react'

class PaddedContainerMenu extends React.Component {
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
                }}
            >
                {this.props.children}
            </div>
        )
    }
}

export default PaddedContainerMenu
