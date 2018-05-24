import React, { Component } from "react";
import "./index.css";

class Resizer extends React.Component {
  constructor(props) {
    super(props);
  }
  onMouseDown(e) {
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
        onMouseDown={this.onMouseDown.bind(this)}
      />
    );
  }
}

export default Resizer;
