import React from 'react';




class PaddedContainerSegment extends React.Component {
    render () {
    return (
        <div className="ui raised very padded container segment">
            {this.props.children}
        </div>
    );

};
}

export default PaddedContainerSegment;