import React from 'react';
import {
    mergeSortProgram
    , getInitialMergeSortState
} from './mergesortiterator';
import * as R from 'ramda';
import { randomize } from '../sortingTools';
import { getIteratorProvider } from '../sortIterator'

const centered = (total, value, step) => (value - (total/2)) * step

const getIterator = getIteratorProvider(mergeSortProgram, getInitialMergeSortState);
let iterator;

class DemonstrateMergeSort extends React.Component {
    constructor() {
	super();

	iterator = getIterator(randomize(R.range(1,100)));
	this.state = { data: iterator.next() };
    }

    render() {
	let {
	    data: {
		list,
		stack
	    }
	} = this.state;
	const inCenteredArray = (value) => centered(list.length, value, 5) + (window.innerWidth/4)
	
	if (iterator.hasMore()) {
	    setTimeout(() => {
		this.setState((previousState, props) => ({ data: iterator.next() }))
	    }, 300);
	}

	const drawBounds = ({ upper, lower }, color) => {
	    const lowerX = inCenteredArray(lower);
	    const upperX = inCenteredArray(upper - 1);
	    const y = (window.innerHeight/2) - 40;
	    const extraColumnWidth = 3;

	    return (
		<svg>
		<g color={color}>
		<rect
		x={lowerX - 1}
		y={y}
		width={1}
		height={10}
		fill="currentColor"
		>
		</rect>
		<rect
		x={upperX + 4}
		y={y}
		width={1}
		height={10}
		fill="currentColor"
		>
		</rect>
		<rect
		x={lowerX - 1}
		y={y + 10}
		width={upperX - lowerX + (2*extraColumnWidth) }
		height={1}
		fill="currentColor"
		>
		</rect>
		</g>
		</svg>
	    )
	}

	let picker = (<svg></svg>)
	if (stack && stack.data) {
	    const { data } = stack;
	    if (data.action === "SPLIT") {
		const { bounds } = data;

		picker = drawBounds(bounds, "black");
	    }

	    if (data.action === "JOIN") {
		const { left, right } = data;

		picker = (
		    <svg>
		    {drawBounds(left, "green")}
		    {drawBounds(right, "blue")}
		    </svg>
		)
	    }
	} else {
	    
	}

	return (
	    <div>
	    <svg width={window.innerWidth/2} height={window.innerHeight/2} className="renderPain">
	    {R.pipe(
		R.zipWith((index, value) => ({ index, value }), R.range(0, list.length)),
		R.map(({ index, value }) => (
		    <rect
		    x={inCenteredArray(index)}
		    y={(window.innerHeight/2 - value) - 40}
		    width={4}
		    height={value}
		    key={index}
		    >
		    </rect>
		))
	    )(list)}
	    {picker}
	    </svg>
	    </div>
	)
    }
}

export { DemonstrateMergeSort };