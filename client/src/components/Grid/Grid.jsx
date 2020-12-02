import React from 'react'
import DetailRestaurantSegment from '../DetailRestaurantSegment/DetailRestaurantSegment'
import PaddedContainerClient from '../PaddedContainerClient/PaddedContainerClient'

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
                    <PaddedContainerClient>
                        <DetailRestaurantSegment
                            restaurant={this.props.restaurant}
                        />
                    </PaddedContainerClient>
                </div>
            </div>
        )
    }
}

export default Grid
