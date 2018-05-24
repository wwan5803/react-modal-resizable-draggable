import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Resizer from "./Resize.js";

class Modal extends Component {
  render() {
    const {
      isDragging,
      width,
      height,
      top,
      left,
      isOpen
    } = this.props;
    if (isOpen) {
        return (
          <div
            ref={node => {
              this.node = node;
            }}
            draggable={isDragging}
            className="flexible-modal"
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

class FlexibleModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDragging: false,
      isResizing: false,
      top:
        this.props.top !== undefined
          ? this.props.top
          : this.props.initHeight
            ? window.innerHeight / 2 - this.props.initHeight / 2 - 50
            : window.innerHeight / 2 - 400 / 2 - 50,
      left:
        this.props.left !== undefined
          ? this.props.left
          : this.props.initWidth
            ? window.innerWidth / 2 - this.props.initWidth / 2 - 21
            : window.innerWidth / 2 - 800 / 2 - 21,
      width: this.props.initWidth ? this.props.initWidth : 800,
      height: this.props.initHeight ? this.props.initHeight : 400,
      rel: null
    };
    this.updateStateResizing = this.updateStateResizing.bind(this);
    this.funcResizing = this.funcResizing.bind(this);
  }

  componentDidMount(){
      document.addEventListener("mousemove", this.onMouseMove.bind(this));
      document.addEventListener("mouseup", this.onMouseUp.bind(this));
      document.addEventListener("keydown", this.pressKey.bind(this));
  }

  componentDidUpdate(props, state) {
    if (!this.state.isDragging && state.isDragging) {
      document.removeEventListener("mousemove", this.onMouseMove.bind(this));
      document.removeEventListener("mouseup", this.onMouseUp.bind(this));
    }
  }

  onMouseDown(e) {
    // only left mouse button
    if (e.button !== 0) return;
    var pos = ReactDOM.findDOMNode(this.node_modal);
    this.setState({
      isDragging: true,
      rel: {
        x: e.pageX - pos.offsetLeft,
        y: e.pageY - pos.offsetTop
      }
    });
    e.stopPropagation();
    e.preventDefault();
  }

  onMouseUp(e) {
    document.removeEventListener("mousemove", this.onMouseMove.bind(this));
    this.setState({ isDragging: false });
    this.setState({ isResizing: false });
    e.stopPropagation();
    e.preventDefault();
  }

  onMouseMove(e) {
    const {disableMove, disableVerticalMove, disableHorizontalMove} = this.props;
    if (this.state.isDragging) {
      if(disableMove){

      }else if(disableVerticalMove && disableHorizontalMove){

      }else if(!disableVerticalMove && disableHorizontalMove){
          this.setState({
              top: e.pageY - this.state.rel.y
          });
      }else if(disableVerticalMove && !disableHorizontalMove){
          this.setState({
              left: e.pageX - this.state.rel.x
          });
      }else if(!disableVerticalMove && !disableHorizontalMove){
          this.setState({
              left: e.pageX - this.state.rel.x,
              top: e.pageY - this.state.rel.y
          });
      }
    } else if (this.state.isResizing) {
      this.funcResizing(e.clientX, e.clientY);
    } else {
      return;
    }
    e.stopPropagation();
    e.preventDefault();
  }

  updateStateResizing(isResizing) {
    this.setState({ isResizing });
  }

  funcResizing(clientX, clientY) {
    const {
      minWidth: mWidth,
      minHeight: mHeight,
      disableVerticalResize,
      disableHorizontalResize
    } = this.props;
    let node = ReactDOM.findDOMNode(this.node_modal);
    let minWidth = mWidth ? mWidth : 200;
    let minHeight = mHeight ? mHeight : 100;
    if (!disableHorizontalResize && clientX > node.offsetLeft + minWidth) {
      this.setState({
        width: clientX - node.offsetLeft + 16 / 2
      });
    }
    if (!disableVerticalResize && clientY > node.offsetTop + minHeight) {
      this.setState({
        height: clientY - node.offsetTop + 16 / 2
      });
    }
  }

  updateStateDragging(isDragging) {
    this.setState({ isDragging });
  }

  pressKey(e){
    const {onRequestClose, disableResize, disableMove, disableVerticalMove, disableHorizontalMove} = this.props;
    if(e.ctrlKey){
        switch(e.keyCode) {
            case 37:
                !disableResize && this.setState((prevState)=>({width: prevState.width - 20}))
                break
            case 38:
                !disableResize && this.setState((prevState)=>({height: prevState.height - 20}))
                break
            case 39:
                !disableResize && this.setState((prevState)=>({width: prevState.width + 20}))
                break
            case 40:
                !disableResize && this.setState((prevState)=>({height: prevState.height + 20}))
                break
        }
    }else{
        switch(e.keyCode) {
            case 27:
                onRequestClose()
                break
            case 37:
                !disableMove && !disableHorizontalMove && this.setState((prevState)=>({left: prevState.left - 20}))
                break
            case 38:
                !disableMove && !disableVerticalMove && this.setState((prevState)=>({top: prevState.top - 20}))
                break
            case 39:
                !disableMove && !disableHorizontalMove && this.setState((prevState)=>({left: prevState.left + 20}))
                break
            case 40:
                !disableMove && !disableVerticalMove && this.setState((prevState)=>({top: prevState.top + 20}))
                break
        }
    }

  }

  render() {
    const { isOpen, onRequestClose, disableResize } = this.props;
    return (
      <div>
        {/*this mask is a must*/}
        {isOpen && <div onClick={onRequestClose} className="flexible-modal-mask" />}
        <Modal
          width={this.state.width}
          height={this.state.height}
          top={this.state.top}
          left={this.state.left}
          isDragging={this.state.isDragging}
          isOpen={isOpen}
          updateStateDragging={this.updateStateDragging.bind(this)}
          transitionName="modal-anim"
          ref={node => {
            this.node_modal = node;
          }}
        >
          {this.props.children}
          <div
            onMouseDown={this.onMouseDown.bind(this)}
            className="flexible-modal-drag-area"
            style={{
              width: this.state.width,
            }}
            ref={dragArea => {
              this.dragArea = dragArea;
            }}
          />
          {!disableResize &&
            <Resizer
              updateStateResizing={this.updateStateResizing}
            />}
        </Modal>
      </div>
    );
  }
}

export default FlexibleModal;
