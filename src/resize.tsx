import React, { Component } from "react";
import "./index.css";

interface PropTypes {
  updateStateResizing: (v: boolean) => void;
}

class Resizer extends React.Component<PropTypes> {
  handleMouseDown() {
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
