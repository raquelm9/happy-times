import React from 'react'
import DetailRestaurantSegment from '../DetailRestaurantSegment/DetailRestaurantSegment'
import PaddedContainerSegment from '../PaddedContainerSegment/PaddedContainerSegment'

class Grid extends React.Component {
    render() {
        return (
            <div
                className="ui stackable one column grid"
                style={{
                    marginLeft: '5px',
                    marginRight: '5px',
                }}
            >
                <div className="column" style={{ textAlign: 'center' }}>
                    <PaddedContainerSegment>
                        <DetailRestaurantSegment
                            restaurant={this.props.restaurant}
                        />
                    </PaddedContainerSegment>
                </div>
            </div>
        )
    }
}

export default Grid
