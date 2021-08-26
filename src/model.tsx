import React, { Component, Fragment } from 'react';
import './index.css';
import * as FontAwesome from 'react-icons/fa';
import { CSSTransition } from 'react-transition-group';

interface PropTypes {
    className: string;
    width: number;
    height: number;
    top: number;
    left: number;
    isDragging: boolean;
    isOpen: boolean;
    isMinimised: boolean;
    onRequestRecover: () => void;
    onFocus: () => void;
}

export default class Modal extends Component<PropTypes> {
    node?: HTMLDivElement | null;
    render() {
        const { isDragging, width, height, top, left, isOpen, isMinimised, onRequestRecover, className, onFocus } = this.props;
        if (isOpen) {
            return (
                <Fragment>
                    <CSSTransition in={!isMinimised} timeout={300} classNames="minimise" unmountOnExit>
                        <div
                            onClick={onFocus}
                            ref={(node) => {
                                this.node = node;
                            }}
                            draggable={isDragging}
                            className={!className ? "flexible-modal" : "flexible-modal " + className}
                            style={{ width, height, top, left }}
                        >
                            {this.props.children}
                        </div>
                    </CSSTransition>
                    {isMinimised && (
                        <button className="flexible-modal-rebound-btn" onClick={onRequestRecover}>
                            <FontAwesome.FaBars />
                        </button>
                    )}
                </Fragment>
            );
        } else {
            return null;
        }
    }
}