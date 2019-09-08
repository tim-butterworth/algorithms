import React from 'react';
import './stack.css';
import * as R from 'ramda';
import {
    emptyStack
    , stackToList
    , size
    , push
    , pop
} from './stackdatastructure';


const pointer = (identifier) => (
    <div
    className={"pointer"}
    data-source-id={"source-" + identifier}>
    next
    </div>
)
const StackNode = (props) => (
    <div className="dataNode" data-target-id={"target-" + props.identifier}>
      <div>{props.nodeValue}</div>
      {pointer(props.identifier)}
    </div>
)
const getStackNode = ([index, data]) => (
    <StackNode
      key={index}
      nodeValue={data.value}
      identifier={index}
    />
)

class DemonstrateStack extends React.Component {

    constructor() {
	super();

	const stack = push(push(emptyStack(), 100), 200);
	
	this.state = {
	    stack,
	    form: {
		toPush: ""
	    }
	}
    }

    render() {
	const pushClickHandler = () => this.setState((previousState, props) => ({
	    form: { toPush: "" },
	    stack: push(previousState.stack, previousState.form.toPush)
	}));
	const popClickHandler = () => this.setState((previousState, props) => ({
	    stack: pop(previousState.stack).remainder
	}));
	const inputHandler = (event) => {
	    const updatedValue = event.target.value;
	    this.setState((previousState, props) => ({ form: { toPush: updatedValue } }))
	}

	const minY = 0;
	const maxY = window.innerHeight/2;

	const minX = 0;
	const maxX = window.innerWidth/2;

	const point = ({ entry, coordinate }) => {
	    const { x, y } = coordinate;
	    const radius = 5;
	    const calculateBackgroundWidth = (text) => (text + "").length * 9
	    const withValue = (value) => (
		<svg>
		<line
		x1={x}
		y1={y}
		x2={x + radius * 2}
		y2={y + radius * 2}
		stroke="black"
		>
		</line>
		<rect
		x={x + 10}
		y={y + 10}
		width={calculateBackgroundWidth(value)}
		height={20}
		fill="tan"
		/>
		<text
		  x={x + (radius * 2) + 3}
		  y={y + (radius * 2) + 15}
		  >
		  {value}
		</text>
		</svg>
	    )
	    const withLabel = (label) => (
		<text
		x={x + (radius*2) + 3}
		y={y + 15}
		>
		{label}
		</text>
	    )
	    
	    return (
		<svg>
		{entry.valueHandler(withValue)}
		{entry.labelHandler(withLabel)}
		<circle
		cx={x}
		cy={y}
		r={radius}
		fill={entry.fill}
		>
		</circle>
		</svg>
	    )
	}

	const classField = (title, { x, y }) => (
	    <svg>
	    <circle
	    cx={x}
	    cy={y}
	    r={5}
	    fill="red"
	    />
	    <text x={x} y={y}>{title}</text>
	    </svg>
	)

	const stackForm = (valueToPush) => {
	    const rootNodeX = maxX/3;
	    const rootNodeY = maxY/8;

	    const nilX = (maxX * 7)/8;
	    const nilY = (maxY * 7)/8;
	    
	    const stack = {
		rootNode: {
		    x: rootNodeX,
		    y: rootNodeY
		},
		nil: {
		    x: nilX,
		    y: nilY
		}
	    };

	    const drawLine = ({from, to}) => {
		return (
		    <path d={
			[
			    "M",
			    `${from.x}`,
			    `${(from.y) + 2}`,
			    "C",
			    `${(from.x) - 5} ${(from.y) + 10},`,
			    `${(from.x) - 5} ${(from.y) + 10},`,
			    `${(to.x) - 5} ${(to.y) - 5}`
			].join(" ")
		    } stroke="black" fill="transparent"/>
		)
	    };

	    const values = [
		...R.map((v) => ({
		    valueHandler: (f) => f(v.value),
		    labelHandler: () => {},
		    fill: "green"
		}), stackToList(this.state.stack)),
		{
		    valueHandler: (f) => {},
		    labelHandler: (f) => f("NIL"),
		    fill: "black"
		}
	    ];

	    const initialX = maxX/2;
	    const xstep = 0;

	    const initialY = maxY/20;
	    const ystep = maxY/5;

	    const pointCoordinates = R.map(
		([entry, index]) => ({entry, coordinate: { x: initialX + (index*xstep), y: initialY + (index*ystep) }}),
		R.zip(values, R.range(0, values.length))
	    )

	    const allCoordinates = [
		stack.rootNode,
		...R.map(({ value, coordinate }) => coordinate, pointCoordinates)
	    ];

	    return (
		<div className="stackForm">
		<div>
	        <input
	        type="text"
	        onChange={inputHandler}
	        value={valueToPush}
	        >
	        </input>
                <button
	        onClick={pushClickHandler}
	        >
	        push
	        </button>
		</div>
		<div>
	        <button
	        onClick={popClickHandler}
	        >
	        pop
	        </button>
		</div>
		<svg width={window.innerWidth/2} height={window.innerHeight/2} className="renderPain">
		{classField("root", { x: stack.rootNode.x, y: stack.rootNode.y})}
		{R.map((index) => drawLine({from: allCoordinates[index], to: allCoordinates[index+1]}), R.range(0, allCoordinates.length - 1))}
		{R.map((node) => point(node), pointCoordinates)}
		</svg>
		</div>
	    )
	}

	const nilNode = () => (
	    <div className="nil" data-target-id="nil">
	    nil
	    </div>
	)
	const showStack = (stack) => [
	    ...R.compose(
		R.map(getStackNode),
		R.zip(R.range(0, size(stack)))
	    )(stackToList(stack)),
	    nilNode()
	]

	const howThisShouldWork = () => R.map((text) => (<div>{text}</div>), [
	    "create stack button",
	    "after pressing initialization steps appear with an execute button",
	    "button pushed, initialization steps run and empty object and fields are drawn",
	    "push and pop inputs and buttons appear",
	    "if push is pressed, execution steps appear with execution button",
	    "if pop is pressed, execution steps appear with execution button"
	]);
	return (
	    <div className="stackContainer">
	      <div>
	        {howThisShouldWork()}
	        {stackForm(this.state.form.toPush)}
	        <div className="pointerContainder">
	          <div className="pointerLabel">Root Node Pointer</div>
	          {pointer("root")}
	        </div>
	        <div>
	          {showStack(this.state.stack)}
	        </div>
	      </div>
	    </div>
	)
    }
}

export { DemonstrateStack };