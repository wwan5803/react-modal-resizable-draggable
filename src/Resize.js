import React, { Component } from "react";
import "./App.css";

class Resizer extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    window.addEventListener("mousemove", this.onMouseMove.bind(this), false);
    window.addEventListener("mouseup", this.onMouseUp.bind(this), false);
  }
  componentWillUnmount() {
    window.removeEventListener("mousemove", this.onMouseMove.bind(this), false);
    window.removeEventListener("mouseup", this.onMouseUp.bind(this), false);
  }
  onMouseDown(e) {
    console.log("Resizer.onMouseDown");

    this.props.updateStateResizing(true);
  }
  onMouseMove(e) {
    console.log("Resizer.onMouseMove");
    if (this.props.isResizing) {
      this.props.funcResizing(e.clientX, e.clientY);
    }
  }
  onMouseUp(e) {
    console.log("Resizer.onMouseUp");
    if (this.props.isResizing) {
      this.props.updateStateResizing(false);
    }
  }
  render() {
    const style = {
      width: 16,
      height: 16
    };
    return (
      <div
        className="resizer"
        style={style}
        onMouseDown={this.onMouseDown.bind(this)}
      />
    );
  }
}

export default Resizer;
