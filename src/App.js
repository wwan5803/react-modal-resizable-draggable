import React, { Component } from "react";
import ReactDOM from 'react-dom';
import logo from "./logo.svg";
import "./App.css";
import Resizer from "./Resize.js";

class Modal extends Component {
  render() {
     const {width, height, isOpen} = this.props;
    if (isOpen) {
      return (
        <div className="modal" style={{width, height}}>
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
    this.setState({isResizing});
  }

  funcResizing(clientX, clientY) {
    let node = ReactDOM.findDOMNode(this.refs["node_modal"]);
    this.setState({width: clientX - node.offsetLeft + 16 / 2, height: clientY - node.offsetTop + 16 / 2});
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  render() {
    return (
      <div className="App">
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
        <Modal width={this.state.width} height={this.state.height} isOpen={this.state.isModalOpen} transitionName="modal-anim" ref={"node_modal"}>
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
