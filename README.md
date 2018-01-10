# react-modal-resizable-draggable

Accessible modal dialog component for React.JS

# Demo
* [link to demo](https://wwan5803.github.io/react-modal-resizable-draggable/)

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
.modal {
  padding: 20px;
  position: absolute;
  z-index: 1;
  border: 1px solid #ccc;
  background: white;
}
.mask {
  position: fixed;
  height: 100%;
  background: rgba(55, 55, 55, 0.6);
  top:0;
  left:0;
  right:0;
  bottom:0;
}
.resizer {
  position:absolute;
  right:0;
  bottom:0;
  cursor:se-resize;
  margin:5px;
  border-bottom: solid 2px #333;
  border-right: solid 2px #333;
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
- `disableDrag` to disable the drag function(default false).
- `disableResize` to disable the resize function(default false).

Example:

```jsx
<Modal
  isOpen={bool}
  onRequestClose={this.closeModal}
  initWidth={800} 
  initHeight={400}
>
  <h1>Modal Content</h1>
  <p>Etc.</p>
</Modal>
```


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
                <button
                    onClick={this.openModal}
                >
                    Open modal
                </button>
                <ReactModal initWidth={800} initHeight={400} onRequestClose={this.closeModal} isOpen={this.state.modalIsOpen}>
                    <h3>My Modal</h3>
                    <div className="body">
                        <p>This is the modal&apos;s body.</p>
                    </div>
                    <button
                        onClick={this.closeModal}
                    >
                        Close modal
                    </button>
                </ReactModal>
            </div>
        );
    }
}

export default App;

```

