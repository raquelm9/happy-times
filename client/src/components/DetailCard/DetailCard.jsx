import React from 'react'
import OneImage from '../OneImage/OneImage'

class DetailCard extends React.Component {
  constructor(props) {
    super(props)

    console.log(this.props)
  }

  render() {
    return (
      <div className="card" style="width: 18rem;">
        {/* <OneImage image={this.props.restaurant.image}></OneImage> */}
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    )
  }
}

export default DetailCard
