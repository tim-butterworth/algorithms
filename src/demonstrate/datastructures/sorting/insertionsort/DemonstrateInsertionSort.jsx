import React from 'react';
import * as R from 'ramda';
import { getInsertionSortIterator } from './insertionsort';
import './insertionsort.css';

let iterator = null;

const centered = (total, value, step) => (value - (total/2)) * step

class DemonstrateInsertionSort extends React.Component {
    constructor() {
	super();

	iterator = getInsertionSortIterator(R.range(1, 100).reverse());

	this.state = { sortState: iterator.next() };
    }

    render() {
	const list = this.state.sortState.list;
	const {
	    progressPointer,
	    insertionPointer
	} = this.state.sortState;
	const inCenteredArray = (value) => centered(list.length, value, 5) + (window.innerWidth/4)
	
	if (iterator.hasMore()) {
	    setTimeout(() => {
		this.setState((previousState, props) => ({ sortState: iterator.next() }));
	    }, 100);
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
	    <svg>
	    <rect
	    x={inCenteredArray(progressPointer)}
	    y={(window.innerHeight/2) - 35}
	    width={2}
	    height={10}
	    >
	    </rect>
	    </svg>
	    <svg>
	    <rect
	    x={inCenteredArray(insertionPointer)}
	    y={(window.innerHeight/2) - 20}
	    width={2}
	    height={10}
	    >
	    </rect>
	    </svg>
	    </svg>
	    </div>
	)
    }
}

export { DemonstrateInsertionSort };