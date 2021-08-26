import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Resizer from './resize';
import Modal from './model';

interface PropTypes {
	top?: number;
	left?: number;
	initHeight?: number;
	initWidth?: number;
	minWidth?: number;
	minHeight?: number;
	isOpen: boolean;
	className?: string;
	disableMove?: boolean;
	disableVerticalMove?: boolean;
	disableHorizontalMove?: boolean;
	isMinimised?: boolean;
	disableResize?: boolean;
	disableKeystroke?: boolean;
	disableVerticalResize?: boolean;
	disableHorizontalResize?: boolean;
	onRequestClose: () => void;
	onRequestMinimise?: () => void;
	onRequestRecover?: () => void;
	onFocus?: () => void;
}


interface StateTypes {
	width: number;
	height: number;
	top: number;
	left: number;
	rel?: {
		x: number;
		y: number;
	};
	isDragging: boolean;
	isResizing: boolean;
}

class FlexibleModal extends Component<PropTypes, StateTypes> {
	node_modal?: Modal | null;
	dragArea?: HTMLDivElement | null;
	dragArea2?: HTMLDivElement | null;
	dragArea3?: HTMLDivElement | null;
	dragArea4?: HTMLDivElement | null;
	constructor(props: Readonly<PropTypes>) {
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
		};
		this.updateStateResizing = this.updateStateResizing.bind(this);
		this.funcResizing = this.funcResizing.bind(this);
		this.resize = this.resize.bind(this);
		this.onMouseMove = this.onMouseMove.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
		this.onMouseDown = this.onMouseDown.bind(this);
		this.pressKey = this.pressKey.bind(this);
	}

	componentDidMount() {
		const { disableKeystroke } = this.props;
		document.addEventListener('mouseup', this.onMouseUp);
		if (!disableKeystroke) document.addEventListener('keydown', this.pressKey);
	}

	componentWillUnmount() {
		const { disableKeystroke } = this.props;
		if (document.removeEventListener) {
			document.removeEventListener('mousemove', this.onMouseMove);
			document.removeEventListener('mouseup', this.onMouseUp);
			if (!disableKeystroke) document.removeEventListener('keydown', this.pressKey);
		}
	}

	onMouseDown(e: {
		button: number; pageX: number; pageY: number; stopPropagation: () => void; preventDefault: () => void;
	}) {
		// only left mouse button
		document.addEventListener('mousemove', this.onMouseMove);
		if (e.button !== 0) return;
		const pos = ReactDOM.findDOMNode(this.node_modal) as HTMLElement;
		if (pos) {
			this.setState({
				isDragging: true,
				rel: {
					x: e.pageX - pos.offsetLeft,
					y: e.pageY - pos.offsetTop
				}
			});
		}
		e.stopPropagation();
		e.preventDefault();
	}

	onMouseUp(e: { stopPropagation: () => void; }) {
		document.removeEventListener('mousemove', this.onMouseMove);
		this.setState({ isDragging: false });
		this.setState({ isResizing: false });
		e.stopPropagation();
		// e.preventDefault();
	}

	onMouseMove(e: { pageY: number; pageX: number; clientX: any; clientY: any; stopPropagation: () => void; preventDefault: () => void; }) {
		const { disableMove, disableVerticalMove, disableHorizontalMove } = this.props;
		const { rel } = this.state;
		if (this.state.isDragging && rel) {
			if (disableMove) {
			} else if (disableVerticalMove && disableHorizontalMove) {
			} else if (!disableVerticalMove && disableHorizontalMove) {
				this.setState({
					top: e.pageY - rel.y
				});
			} else if (disableVerticalMove && !disableHorizontalMove) {
				this.setState({
					left: e.pageX - rel.x
				});
			} else if (!disableVerticalMove && !disableHorizontalMove) {
				this.setState({
					left: e.pageX - rel.x,
					top: e.pageY - rel.y
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

	updateStateResizing(isResizing: any) {
		document.addEventListener('mousemove', this.onMouseMove);
		this.setState({ isResizing });
	}

	funcResizing(clientX: number, clientY: number) {
		const { minWidth: mWidth, minHeight: mHeight, disableVerticalResize, disableHorizontalResize } = this.props;
		let node = ReactDOM.findDOMNode(this.node_modal) as HTMLElement;
		let minWidth = mWidth ? mWidth : 200;
		let minHeight = mHeight ? mHeight : 100;
		if (!disableHorizontalResize && node && clientX > node.offsetLeft + minWidth) {
			this.setState({
				width: clientX - node.offsetLeft + 16 / 2
			});
		}
		if (!disableVerticalResize && node && clientY > node.offsetTop + minHeight) {
			this.setState({
				height: clientY - node.offsetTop + 16 / 2
			});
		}
	}

	pressKey(e: { ctrlKey: any; keyCode: any; }) {
		const { onRequestClose, disableResize, disableMove, disableVerticalMove, disableHorizontalMove } = this.props;
		if (e.ctrlKey) {
			switch (e.keyCode) {
				case 37:
					!disableResize && this.setState((prevState) => ({ width: prevState.width - 20 }));
					break;
				case 38:
					!disableResize && this.setState((prevState) => ({ height: prevState.height - 20 }));
					break;
				case 39:
					!disableResize && this.setState((prevState) => ({ width: prevState.width + 20 }));
					break;
				case 40:
					!disableResize && this.setState((prevState) => ({ height: prevState.height + 20 }));
					break;
			}
		} else {
			switch (e.keyCode) {
				case 27:
					onRequestClose();
					break;
				case 37:
					!disableMove &&
						!disableHorizontalMove &&
						this.setState((prevState) => ({ left: prevState.left - 20 }));
					break;
				case 38:
					!disableMove && !disableVerticalMove && this.setState((prevState) => ({ top: prevState.top - 20 }));
					break;
				case 39:
					!disableMove &&
						!disableHorizontalMove &&
						this.setState((prevState) => ({ left: prevState.left + 20 }));
					break;
				case 40:
					!disableMove && !disableVerticalMove && this.setState((prevState) => ({ top: prevState.top + 20 }));
					break;
			}
		}
	}

	resize(width: any, height: any) {
		this.setState((prevState) => (
			{ width: width || prevState.width, height: height || prevState.height }
		));
	}

	render() {
		const { isOpen, isMinimised, onRequestClose, onRequestMinimise, onRequestRecover, disableResize, className, onFocus } = this.props;
		return (
			<div>
				{/*this mask is a must*/}
				{isOpen &&
					!isMinimised && (
						<div
							onClick={onRequestMinimise ? onRequestMinimise : onRequestClose}
							className="flexible-modal-mask"
						/>
					)}
				<Modal
					className={className}
					onFocus={onFocus}
					width={this.state.width}
					height={this.state.height}
					top={this.state.top}
					left={this.state.left}
					isDragging={this.state.isDragging}
					onRequestRecover={onRequestRecover}
					isMinimised={isMinimised}
					isOpen={isOpen}
					ref={(node) => {
						this.node_modal = node;
					}}
				>
					{this.props.children}
					<div
						onMouseDown={this.onMouseDown}
						className="flexible-modal-drag-area"
						style={{
							width: this.state.width
						}}
						ref={(dragArea) => {
							this.dragArea = dragArea;
						}}
					/>
					<div
						onMouseDown={this.onMouseDown}
						className="flexible-modal-drag-area-left"
						style={{
							height: this.state.height
						}}
						ref={(dragArea) => {
							this.dragArea2 = dragArea;
						}}
					/>
					<div
						onMouseDown={this.onMouseDown}
						className="flexible-modal-drag-area-bottom"
						style={{
							width: this.state.width
						}}
						ref={(dragArea) => {
							this.dragArea3 = dragArea;
						}}
					/>
					<div
						onMouseDown={this.onMouseDown}
						className="flexible-modal-drag-area-right"
						style={{
							height: this.state.height
						}}
						ref={(dragArea) => {
							this.dragArea4 = dragArea;
						}}
					/>
					{!disableResize && <Resizer updateStateResizing={this.updateStateResizing} />}
				</Modal>
			</div>
		);
	}
}

export default FlexibleModal;
