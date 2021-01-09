import React from 'react'
import './OneImage.css'

class OneImage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: false,
    }
  }

  handleDisplayError() {
    this.setState({ error: true })
  }

  render() {
    const { error } = this.state

    if (error) {
      return (
        <img
          className="card-img-top"
          src={require('../../assets/placeholder.png')}
        />
      )
    } else {
      return (
        <img
          className="card-img-top"
          id="photo"
          src={this.props.image}
          onError={this.handleDisplayError.bind(this)}
        />
      )
    }
  }
}

export default OneImage
