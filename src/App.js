import React, { Component } from "react";
import ReactDOM from "react-dom";
import logo from "./logo.svg";
import "./App.css";
import Resizer from "./Resize.js";

class Modal extends Component {
  onMouseDown(e) {
    console.log("Draggable.onMouseDown");
    var elm = document.elementFromPoint(e.clientX, e.clientY);
    if (elm.className != "resizer") {
      this.props.updateStateDragging(true);
    }
  }
  onMouseUp(e) {
    console.log("Draggable.onMouseUp");
    this.props.updateStateDragging(false);
  }
  onDragStart(e) {
    console.log("Draggable.onDragStart");
    const nodeStyle = this.refs.node.style;
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({
        id: this.props.id,
        // mouse position in a draggable element
        x: e.clientX - parseInt(nodeStyle.left),
        y: e.clientY - parseInt(nodeStyle.top)
      })
    );
  }
  onDragEnd(e) {
    console.log("Draggable.onDragEnd");
    this.props.updateStateDragging(false);
  }

  render() {
    const { isDragging, width, height, top, left, isOpen } = this.props;
    if (isOpen) {
      return (
        <div
          ref={"node"}
          draggable={isDragging}
          onMouseDown={this.onMouseDown.bind(this)}
          onMouseUp={this.onMouseUp.bind(this)}
          onDragStart={this.onDragStart.bind(this)}
          onDragEnd={this.onDragEnd.bind(this)}
          className="modal"
          style={{ width, height, top, left }}
        >
          {this.props.children}
        </div>
      );
    } else {
      return null;
    }
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      isDragging: false,
      isResizing: false,
      top: 100,
      left: 50,
      width: 100,
      height: 150
    };
    this.updateStateResizing = this.updateStateResizing.bind(this);
    this.funcResizing = this.funcResizing.bind(this);
  }

  updateStateResizing(isResizing) {
    this.setState({ isResizing });
  }

  funcResizing(clientX, clientY) {
    let node = ReactDOM.findDOMNode(this.refs["node_modal"]);
    this.setState({
      width: clientX - node.offsetLeft + 16 / 2,
      height: clientY - node.offsetTop + 16 / 2
    });
  }

  onDragOver(e) {
    console.log("DropArea.onDragOver");
    e.preventDefault();
    return false;
  }
  onDrop(e) {
    console.log("DropArea.onDrop");
    var obj = JSON.parse(e.dataTransfer.getData("application/json"));
    this.setState({isDragging: false, top: e.clientY - obj.y, left: e.clientX - obj.x});
    e.preventDefault();
  }

  updateStateDragging(isDragging) {
    this.setState({isDragging});
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  render() {
    return (
      <div
        className="App"
        onDragOver={this.onDragOver.bind(this)}
        onDrop={this.onDrop.bind(this)}
      >
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <button
          onClick={() => {
            this.openModal();
          }}
        >
          Open modal
        </button>
        {/*this is mask used when modal is not all screen*/}
        {this.state.isModalOpen && <div className="mask" />}
        <Modal
          width={this.state.width}
          height={this.state.height}
          top={this.state.top}
          left={this.state.left}
          isDragging={this.state.isDragging}
          isOpen={this.state.isModalOpen}
          updateStateDragging={this.updateStateDragging.bind(this)}
          transitionName="modal-anim"
          ref={"node_modal"}
        >
          <h3>My Modal</h3>
          <div className="body">
            <p>This is the modal&apos;s body.</p>
          </div>
          <button
            onClick={() => {
              this.closeModal();
            }}
          >
            Close modal
          </button>
          <Resizer
            ref={"resizerNode"}
            isResizing={this.state.isResizing}
            updateStateResizing={this.updateStateResizing}
            funcResizing={this.funcResizing}
          />
        </Modal>
      </div>
    );
  }
}

export default App;

