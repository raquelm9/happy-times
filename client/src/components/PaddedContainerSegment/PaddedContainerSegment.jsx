import React from 'react';




const PaddedContainerSegment = (props) => {
    return (
        <div className="ui raised very padded container segment">{props.children}
  </div>
    );

};

export default PaddedContainerSegment;