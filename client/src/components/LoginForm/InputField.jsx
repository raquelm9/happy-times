import React from 'react'
import './Input.css'
class InputField extends React.Component {
  render() {
    return (
      <div className="inputField">
        <input
          className=" inputL"
          type={this.props.type}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={(e) => this.props.onChange(e.target.value)}
        />

        <span id="span" className="bottom"></span>
        <span id="span" className="right"></span>
        <span id="span" className="top"></span>
        <span id="span" className="left"></span>
      </div>
    )
  }
}

export default InputField
