import React from 'react'
import { addressLabel } from '../../helpers/address'
import HappyHourMenu from '../HappyHourMenu/HappyHourMenu'
import PaddedContainerSegment from '../PaddedContainerSegment/PaddedContainerSegment'
import './DetailRestaurantSegment.css'

class DetailRestaurantSegment extends React.Component {
    render() {
        return (
            <>
                <p className="ui header restaurantName">
                    {this.props.restaurant.name}
                </p>
                <p className="address">
                    Address: {addressLabel(this.props.restaurant)}
                </p>
                <p>
                    Website:{' '}
                    <a href={this.props.restaurant.website} target="_blank">
                        {this.props.restaurant.website}
                    </a>
                </p>

                <p>Description: {this.props.restaurant.description}</p>
                <br></br>
                <p>
                    <a
                        className="btn btn-dark"
                        data-toggle="collapse"
                        href="#collapseExample"
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                    >
                        Happy Hour Menu
                    </a>
                </p>

                <div className="collapse" id="collapseExample">
                    <div className="card card-body">
                        <div className="column">
                            <PaddedContainerSegment>
                                <HappyHourMenu
                                    restaurant={this.props.restaurant}
                                />
                            </PaddedContainerSegment>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default DetailRestaurantSegment
