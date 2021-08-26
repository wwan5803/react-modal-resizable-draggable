# react-modal-resizable-draggable

Accessible modal dialog component for React.JS

# Demo
* [link to demo](https://wwan5803.github.io/react-modal-resizable-draggable/)

# Keyboard feature support
* arrowLeft: move left 20px
* arrowRight: move right 20px
* arrowUp: move up 20px
* arrowDown: move down 20px
* ctrl + arrowLeft: decrease width 20px
* ctrl + arrowRight: increase width 20px
* ctrl + arrowUp: increase height 20px
* ctrl + arrowDown: decrease height 20px

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Styles](#styles)
* [Examples](#examples)
* [Testing](#testing)
* [Demos](#demos)

## Installation

To install, you can use [npm](https://npmjs.org/) or [yarn](https://yarnpkg.com):


    $ npm install react-modal-resizable-draggable
    $ yarn add react-modal-resizable-draggable


## Usage
Add following css style to your css file
```css
.flexible-modal {
  position: absolute;
  z-index: 1;
  border: 1px solid #ccc;
  background: white;
}
.flexible-modal-mask {
  position: fixed;
  height: 100%;
  background: rgba(55, 55, 55, 0.6);
  top:0;
  left:0;
  right:0;
  bottom:0;
}
.flexible-modal-resizer {
  position:absolute;
  right:0;
  bottom:0;
  cursor:se-resize;
  margin:5px;
  border-bottom: solid 2px #333;
  border-right: solid 2px #333;
}
.flexible-modal-drag-area{
  background: rgba(22, 22, 333, 0.2);
  height: 50px;
  position:absolute;
  right:0;
  top:0;
  cursor:move;
}
```

The Modal object has one required prop:

- `isOpen` to render its children.

Optional prop:

- `minWidth` The minimum width of the modal(default 0).
- `minHeight` The minimum height of the modal(default 0).
- `initWidth` The initial width of the modal(default 800).
- `initHeight` The initial width of the modal(default 400).
- `top` The position of the modal.
- `left` The position of the modal.
- `onRequestClose` to close the modal.
- `disableMove` to disable the drag function(default false).
- `disableResize` to disable the resize function(default false).
- `disableVerticalResize` to disable the vertical resize function(default false).
- `disableHorizontalResize` to disable the horizontal resize function(default false).
- `disableVerticalMove` to disable the vertical drop function(default false).
- `disableHorizontalMove` to disable the horizontal drop function(default false).
- `disableKeystroke` to disable keystroke listener(default false).
- `onFocus` called when the modal is clicked.
- `className` The additional class to the modal.


## Examples

Inside an app:

```jsx
import React, {Component} from 'react';
import './App.css';
import ReactModal from 'react-modal-resizable-draggable';

class App extends Component {

    constructor() {
        super();

        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }


    openModal() {
        this.setState({modalIsOpen: true});
    }
    closeModal() {
        this.setState({modalIsOpen: false});
    }


    render() {
        return (
            <div className="App">
                <button onClick={this.openModal}>
                    Open modal
                </button>
                <ReactModal 
                    initWidth={800} 
                    initHeight={400} 
                    onFocus={() => console.log("Modal is clicked")}
                    className={"my-modal-custom-class"}
                    onRequestClose={this.closeModal} 
                    isOpen={this.state.modalIsOpen}>
                    <h3>My Modal</h3>
                    <div className="body">
                        <p>This is the modal&apos;s body.</p>
                    </div>
                    <button onClick={this.closeModal}>
                        Close modal
                    </button>
                </ReactModal>
            </div>
        );
    }
}

export default App;

```

