import React, { Component } from "react";
import "./index.css";

class Resizer extends React.Component {
  constructor(props) {
    super(props);
  }
  handleMouseDown(e) {
    this.props.updateStateResizing(true);
  }
  render() {
    const style = {
      width: 16,
      height: 16
    };
    return (
      <div
        className="flexible-modal-resizer"
        style={style}
        onMouseDown={this.handleMouseDown.bind(this)}
      />
    );
  }
}

export default Resizer;
