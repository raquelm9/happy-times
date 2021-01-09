import React from 'react'
import DetailRestaurantSegment from '../DetailRestaurantSegment/DetailRestaurantSegment'
import PaddedContainerClient from '../PaddedContainerClient/PaddedContainerClient'

class Grid extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="ui stackable one column grid">
        <div className="column" style={{ textAlign: 'center' }}>
          <PaddedContainerClient>
            <DetailRestaurantSegment restaurant={this.props.restaurant} />
          </PaddedContainerClient>
        </div>
      </div>
    )
  }
}

export default Grid
