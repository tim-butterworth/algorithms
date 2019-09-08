import React from 'react';
import * as R from 'ramda';
import { displayEvent } from './displayEvent';
import { DemonstrateStack } from "./datastructures/stack";

class Collapsable extends React.Component {
    constructor() {
	super();

	this.state = { display: true }
    }
    
    render() {
	const toggleDisplay = () => this.setState((previousState, props) => ({ display: (!previousState.display)}))
	const getDisplayComponents = (child, shouldDisplay) => {
	    if (shouldDisplay) {
		return { child, showHide: (<div>hide stack</div>)};
	    } else {
		return { child: (<div></div>), showHide: <div>show stack</div>}
	    }
	}
	const displayComponent = getDisplayComponents(this.props.children, this.state.display);

	return (
	    <div>
	    <div onClick={toggleDisplay}>{displayComponent.showHide}</div>
	    {displayComponent.child}
	    </div>
	)
    }
}

class Architecture extends React.Component {

    constructor({ source }) {
	super();

	this.source = source;
    }

    render() {
	return (
	    <div>
	      <div>
	        Achitecture
	      </div>
	      <div>
	        {R.map(displayEvent, this.source.events)}
	      </div>
	      <Collapsable>
	        <DemonstrateStack/>
	      </Collapsable>
	    </div>
	);
    }
    
}

export { Architecture };