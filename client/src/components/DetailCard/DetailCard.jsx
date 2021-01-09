import React from 'react'
import './DetailCard.css'
import { addressLabel } from '../../helpers/address'
import HappyHourMenu from '../HappyHourMenu/HappyHourMenu'
import PaddedContainerMenu from '../PaddedContainerMenu/PaddedContainerMenu'

class DetailCard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const restaurant = this.props.restaurant

    return (
      <>
        <div
          className="row"
          style={{
            backgroundColor: '#121212',
          }}
        >
          <div className="col"></div>
          <div className="project-card-blueprint col-sm-10 col-md-6 col-lg-6">
            <div className="row">
              <div
                className="project-image col-12"
                style={{
                  backgroundImage: `url(${restaurant.image})`,
                }}
              ></div>
              <div className="project-name-description col-12">
                <p className="projects-title">{restaurant.name}</p>
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
                    style={{ backgroundColor: 'none' }}
                  >
                    <div className="column">
                      <PaddedContainerMenu>
                        <HappyHourMenu restaurant={this.props.restaurant} />
                      </PaddedContainerMenu>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col"></div>
        </div>
      </>
    )
  }
}

export default DetailCard
