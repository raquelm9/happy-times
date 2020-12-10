import React from 'react'
import { addressLabel } from '../../helpers/address'
import HappyHourMenu from '../HappyHourMenu/HappyHourMenu'
import PaddedContainerMenu from '../PaddedContainerMenu/PaddedContainerMenu'
import './DetailRestaurantSegment.css'

class DetailRestaurantSegment extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <p
                    className="ui header restaurantName"
                    style={{ color: 'black' }}
                >
                    {this.props.restaurant.name}
                </p>

                <p className="address font-size-details">
                    Address: {addressLabel(this.props.restaurant)}
                </p>
                <p className="font-size-details">
                    Website:{' '}
                    <a
                        style={{ color: 'black' }}
                        href={this.props.restaurant.website}
                        target="_blank"
                    >
                        {this.props.restaurant.website}
                    </a>
                </p>

                <p className="font-size-details special-font-description">
                    {' '}
                    {this.props.restaurant.description}
                </p>

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
                    <div
                        className="card card-body"
                        style={{ backgroundColor: '#121212' }}
                    >
                        <div className="column">
                            <PaddedContainerMenu>
                                <HappyHourMenu
                                    restaurant={this.props.restaurant}
                                />
                            </PaddedContainerMenu>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default DetailRestaurantSegment
