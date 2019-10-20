import * as R from 'ramda';
import {
    emptyStack
    , push
    , pop
    , stackToList
    , isEmpty
    , size
} from '../../stackdatastructure';

const SPLIT = "SPLIT"
const JOIN = "JOIN"

const split = (bounds) => ({
    action: SPLIT,
    bounds
})
const join = (left, right) => ({
    action: JOIN,
    left,
    right
})
const getInitialMergeSortState = (list) => ({
    list,
    stack: push(
	emptyStack(),
	split({ lower: 0, upper: list.length })
    ),
    merging: null
})
const splitBounds = ({ upper, lower }) => {
    const splitPoint = Math.floor((upper + lower)/2);
    return {
	left: {
	    lower,
	    upper: splitPoint
	}, right: {
	    lower: splitPoint,
	    upper
	}
    }
}

const normal = (index, state) => ({ type: "step", index, state })
const done = (state) => ({ type: "done", state })
const error = (state, message) => ({ type: "error", state, message })

const afterWhile = -1;

const subList = (list, lower, upper) => {
    let start = lower;
    let result = [];

    R.forEach(
	(index) => result.push(list[index]),
	R.range(lower, upper)
    );

    return result;
}
const getSublistIterator = (list) => ({ lower, upper }) => {

    let p = lower;
    const hasMore = () => p < upper;
    const peek = () => list[p];
    const next = () => p = p + 1;

    return {
	peek,
	next,
	hasMore
    }
}

const mergeSortProgram = {
    1: (state) => {
	if (state.stack.isEmpty) {
	    return normal(afterWhile, state);
	}

	return normal(2, state);
    },
    2: (state) => {
	let { stack, list } = state;
	let { value, remainder } = pop(stack);

	console.log("action", value.action);

	if (value.action === SPLIT) {
	    let { bounds } = value;

	    if ((bounds.upper - bounds.lower) > 1) {
		let { left, right } = splitBounds(bounds);

		let updatedStack = R.reduce(
		    (accume, v) => v(accume),
		    remainder,
		    [
			(s) => push(s, join(left, right)),
			(s) => push(s, split(right)),
			(s) => push(s, split(left))
		    ]
		);

		const updatedState = Object.assign({}, state, { stack: updatedStack });

		return normal(1, updatedState);
	    } else {
		return normal(1, Object.assign({}, state, { stack: remainder }));
	    }
	} else if (value.action === JOIN) {
	    const { left, right } = value;
	    const result = [];
	    const iteratorBuilder = getSublistIterator(state.list);
	    const leftIterator = iteratorBuilder(left);
	    const rightIterator = iteratorBuilder(right);

	    const addRemaining = (iterator, list) => {
		while(iterator.hasMore()) {
		    list.push(iterator.peek());

		    iterator.next();
		}
	    }
	    const injectInto = (originalList, section, { lower, upper }) => {
		return R.map(
		    (index) => {
			if (index >= lower && index < upper) {
			    return section[index - lower];
			} else {
			    return originalList[index];
			}
		    },
		    R.range(0, originalList.length)
		)
	    }

	    while (leftIterator.hasMore() || rightIterator.hasMore()) {
		if (!leftIterator.hasMore()) {
		    addRemaining(rightIterator, result);
		} else if (!rightIterator.hasMore()) {
		    addRemaining(leftIterator, result);
		} else {
		    const leftVal = leftIterator.peek();
		    const rightVal = rightIterator.peek();

		    if (rightVal < leftVal) {
			rightIterator.next();

			result.push(rightVal);
		    } else {
			leftIterator.next();

			result.push(leftVal);
		    }
		}
	    }

	    const updatedList = injectInto(
		list,
		result,
		{
		    lower: left.lower,
		    upper: right.upper
		}
	    );

	    console.log("updatedList", updatedList);
	    const updatedState = Object.assign({}, state, { stack: remainder, list: updatedList });
	    
	    return normal(1, updatedState);
	} else {
	    return done(state);
	}
    }
}

export {
    mergeSortProgram
    , getInitialMergeSortState
};

