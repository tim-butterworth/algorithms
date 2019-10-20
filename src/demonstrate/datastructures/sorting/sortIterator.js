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

const getIteratorProvider = (program, getInitialState) => (list) => {

    let p = 0;
    let currentState = getInitialState(list);
    let finished = false;
    
    const hasMore = () => !finished;
    const next = () => {
	if (p === 0) {
	    p = 1;
	} else {
	    const { updatedFinished, updatedState, updatedP } = applyStep(program[p], currentState);

	    console.log(updatedP);

	    p = updatedP;
	    currentState = updatedState;
	    finished = updatedFinished;
	}

 	return currentState;
    }

    return {
	next,
	hasMore
    }
}

export { getIteratorProvider };
