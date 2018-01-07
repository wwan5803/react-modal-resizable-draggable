# react-modal-resizable-draggable

Accessible modal dialog component for React.JS


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

The Modal object has one required prop:

- `isOpen` to render its children.

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

