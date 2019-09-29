const getInitialState = (list) => ({
    list,
    progressPointer: 1,
    insertionPointer: 1,
    temp: null,
    comparisonPair: null,
    shouldReverse: null,
    totalElements: null,
    spaceToMoveBack: null
})

const normal = (index, state) => ({ type: "step", index, state })
const done = (state) => ({ type: "done", state })
const error = (state, message) => ({ type: "error", state, message })

const afterOuterWhile = 17
const afterInnerWhile = 16

const program = {
    1 :  (state) => {
        if (state.list.isEmpty || state.list.count == 1) {
            return done(state);
        } else {
            return normal(2, state);
        }
    },
    2 : (state) => {
	const updatedState = Object.assign({}, state, { progressPointer: 1 });
	
        return normal(3, updatedState);
    },
    3: (state) => {
	const updatedState = Object.assign({}, state, { insertionPointer: 1 });
        
        return normal(4, updatedState);
    },
    4: (state) => {
	const updatedState = Object.assign({}, state, { totalElements: state.list.length });
        
        return normal(5, updatedState);
    },
    5: (state) => {
	if (state.totalElements && state.progressPointer < state.totalElements) {
	    const updatedState = Object.assign({}, state, { totalElements: null });

	    return normal(6, updatedState)
	}
        
        return normal(afterOuterWhile, state);
    },
    6: (state) => {
	const updatedState = Object.assign({}, state, { insertionPointer: state.progressPointer });
	
        return normal(7, updatedState);
    },
    7: (state) => {
        const updatedState = Object.assign({}, state, { spaceToMoveBack: state.insertionPointer });

        return normal(8, updatedState);
    },
    8: (state) => {
	const moveBack = state.spaceToMoveBack;
	if (moveBack === 0) {
	    return normal(afterInnerWhile, state);
	}
	
        return normal(9, state);
    },
    9: (state) => {
	const list = state.list;
	const firstIndex = state.insertionPointer;

	const getIndexValue = (index, values) => ({ index, value: values[index] })

	const updatedState = Object.assign(
	    {},
	    state, {
		comparisonPair: {
		    first: getIndexValue(firstIndex, list),
		    second: getIndexValue(firstIndex - 1, list)
		}
	    })
	
        return normal(10, updatedState);
    },
    10: (state) => {
	let shouldReverse = false;
        const comparisonPair = state.comparisonPair;
	if (comparisonPair) {
	    shouldReverse = comparisonPair.first.value < comparisonPair.second.value;
	}

	const updatedState = Object.assign({}, state, { shouldReverse });
        
        return normal(11, updatedState);
    },
    11: (state) => {
	const updatedState = Object.assign({}, state, { shouldReverse: null });
	const shouldReverse = state.shouldReverse;
	if (shouldReverse) {
	    return normal(12, updatedState);
	} else {
	    return normal(afterInnerWhile, updatedState);
	}
    },
    12: (state) => {
	const comparisonPair = state.comparisonPair;

	if (comparisonPair) {
	    const updatedState = Object.assign({}, state, { temp: state.comparisonPair.first.value });

	    return normal(13, updatedState);
	} else {
	    return error(state, "state.comparisonPair should have been populated");
	}
    },
    13: (state) => {
	const comparisonPair = state.comparisonPair;

	if (comparisonPair) {
	    const updatedList = [...state.list];
	    updatedList[comparisonPair.first.index] = comparisonPair.second.value;
	    
	    const updatedState = Object.assign({}, state, { list: updatedList });
	    
	    return normal(14, updatedState);
	} else {
	    return error(state, "state.comparisonPair should have been populated");
	}
    },
    14: (state) => {
	const comparisonPair = state.comparisonPair;

	if (comparisonPair) {
	    const updatedList = [...state.list];
	    updatedList[comparisonPair.second.index] = comparisonPair.first.value;

	    const updatedState = Object.assign({}, state, {
		list: updatedList,
		temp: null,
		comparisonPair: null
	    });

	    return normal(15, updatedState);
	} else {
	    return error(state, "state.comparisonPair should have been populated");
	}
    },
    15: (state) => {
	const updatedState = Object.assign({}, state, { insertionPointer: (state.insertionPointer - 1) });
	
        return normal(7, updatedState);
    },
    [afterInnerWhile]: (state) => {
	const updatedState = Object.assign({}, state, { progressPointer: (state.progressPointer + 1) });

        return normal(4, updatedState);
    },
    [afterOuterWhile]: (state) => {
	const updatedState = Object.assign({}, state, { insertionPointer: state.progressPointer });
        
        return done(updatedState);
    }
}

const applyStep = (maybeFun, currentState) => {
    if (maybeFun) {
	const next = maybeFun(currentState)

        if (next.type === "step") {
	    return {
		updatedFinished: false,
		updatedState: next.state,
		updatedP: next.index
	    }
	}

	if (next.type === "done") {
	    return {
		updatedFinished: false,
		updatedState: next.state,
		updatedP: -1
	    }
	}

    } 

    return {
	updatedFinished: true,
	updatedState: currentState,
	updatedP: -1
    }
}

const getInsertionSortIterator = (list) => {

    let p = 0;
    let currentState = getInitialState(list);
    let finished = false

    const hasMore = () => !finished
    const next = () => {
        if (p === 0) {
            p = 1
            return currentState
        } else if (finished) {
            return currentState
        } else {
            const { updatedFinished, updatedState, updatedP } = applyStep(program[p], currentState)

	    console.log(updatedP);
	    
            p = updatedP
            currentState = updatedState
            finished = updatedFinished
        }
        
        return currentState
    }

    return {
	next,
	hasMore
    }
}

export { getInsertionSortIterator };
