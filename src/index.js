import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Resizer from "./Resize.js";

class Modal extends Component {
    onMouseDown(e) {
        var elm = document.elementFromPoint(e.clientX, e.clientY);
        if (elm.className != "resizer") {
            this.props.updateStateDragging(true);
        }
    }
    onMouseUp(e) {
        this.props.updateStateDragging(false);
    }
    onDragStart(e) {
        const nodeStyle = this.node.style;
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
        this.props.updateStateDragging(false);
    }

    render() {
        const { disableDrag, isDragging, width, height, top, left, isOpen } = this.props;
        if (isOpen) {
            if(!!disableDrag){
                return (
                    <div
                        ref={node=>{this.node=node}}
                        onMouseDown={this.onMouseDown.bind(this)}
                        onMouseUp={this.onMouseUp.bind(this)}
                        className="modal"
                        style={{ width, height, top, left }}
                    >
                        {this.props.children}
                    </div>
                )
            }else{
                return (
                    <div
                        ref={node=>{this.node=node}}
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
                )
            }

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
            top: this.props.top !== undefined ? this.props.top : this.props.initHeight ? window.innerHeight/2 - this.props.initHeight/2 - 50 : window.innerHeight/2 - 400/2 - 50,
            left: this.props.left !== undefined ? this.props.left : this.props.initWidth ? window.innerWidth/2 - this.props.initWidth/2 - 21 : window.innerWidth/2 - 800/2 - 21,
            width: this.props.initWidth ? this.props.initWidth : 800,
            height: this.props.initHeight ? this.props.initHeight : 400
        };
        this.updateStateResizing = this.updateStateResizing.bind(this);
        this.funcResizing = this.funcResizing.bind(this);
    }

    updateStateResizing(isResizing) {
        this.setState({ isResizing });
    }

    funcResizing(clientX, clientY) {
        const {minWidth:mWidth, minHeight:mHeight, disableVerticalResize, disableHorizontalResize} = this.props;
        let node = ReactDOM.findDOMNode(this.node_modal);
        let minWidth = mWidth ? mWidth : 0;
        let minHeight = mHeight ? mHeight : 0;
        if(!disableHorizontalResize && clientX > node.offsetLeft + minWidth){
            this.setState({
                width: clientX - node.offsetLeft + 16 / 2
            });
        }
        if(!disableVerticalResize && clientY > node.offsetTop + minHeight){
            this.setState({
                height: clientY - node.offsetTop + 16 / 2
            });
        }
    }

    onDragOver(e) {
        if(!this.props.disableDrag){
            e.preventDefault();
        }
        return false;
    }
    onDrop(e) {
        var obj = JSON.parse(e.dataTransfer.getData("application/json"));
        this.setState({isDragging: false});
        if(!this.props.disableVerticalDrop){
            this.setState({top: e.clientY - obj.y});
        }
        if(!this.props.disableHorizontalDrop){
            this.setState({left: e.clientX - obj.x});
        }
        e.preventDefault();
    }

    updateStateDragging(isDragging) {
        this.setState({isDragging});
    }

    render() {
        const {isOpen, onRequestClose, disableResize, disableDrag} = this.props;
        return (
            <div
                className="App"
                onDragOver={this.onDragOver.bind(this)}
                onDrop={this.onDrop.bind(this)}
            >

                {/*this mask is a must*/}
                {isOpen && <div onClick={onRequestClose} className="mask" />}
                <Modal
                    disableDrag={disableDrag}
                    width={this.state.width}
                    height={this.state.height}
                    top={this.state.top}
                    left={this.state.left}
                    isDragging={this.state.isDragging}
                    isOpen={isOpen}
                    updateStateDragging={this.updateStateDragging.bind(this)}
                    transitionName="modal-anim"
                    ref={node=>{this.node_modal = node}}
                >
                    {this.props.children}
                    {
                        !disableResize &&
                        <Resizer
                            isResizing={this.state.isResizing}
                            updateStateResizing={this.updateStateResizing}
                            funcResizing={this.funcResizing}
                        />
                    }
                </Modal>
            </div>
        );
    }
}

export default FlexibleModal;

